// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title RoboPact
 * @dev 机器人契约 - 一个自动执行、带有经济惩罚的链上承诺协议
 */
contract RoboPact {
    struct Pact {
        address creator;
        address opponent;
        string description;
        uint256 stake;
        uint256 deadline;
        bool creatorFinished;
        bool opponentFinished;
        bool resolved;
        address winner;
    }

    mapping(uint256 => Pact) public pacts;
    uint256 public nextPactId = 1;

    // 黑洞地址 - 用于销毁未完成契约的押金
    address public constant BURN_ADDRESS =
        0x000000000000000000000000000000000000dEaD;

    event PactCreated(
        uint256 indexed pactId,
        address indexed creator,
        address indexed opponent,
        string description,
        uint256 stake,
        uint256 deadline
    );

    event PactFinished(uint256 indexed pactId, address indexed participant);

    event PactResolved(
        uint256 indexed pactId,
        address indexed winner,
        uint256 amount
    );

    error PactNotFound();
    error PactAlreadyResolved();
    error PactNotExpired();
    error NotParticipant();
    error AlreadyFinished();

    /**
     * @dev 创建新的契约
     * @param _description 承诺内容
     * @param _opponent 对手方地址
     * @param _duration 持续时间（秒）
     */
    function createPact(
        string memory _description,
        address _opponent,
        uint256 _duration
    ) external payable {
        require(msg.value > 0, "Stake must be greater than 0");
        require(_opponent != address(0), "Invalid opponent address");
        require(_opponent != msg.sender, "Cannot create pact with yourself");
        require(_duration > 0, "Duration must be greater than 0");

        uint256 pactId = nextPactId++;
        uint256 deadline = block.timestamp + _duration;

        pacts[pactId] = Pact({
            creator: msg.sender,
            opponent: _opponent,
            description: _description,
            stake: msg.value,
            deadline: deadline,
            creatorFinished: false,
            opponentFinished: false,
            resolved: false,
            winner: address(0)
        });

        emit PactCreated(
            pactId,
            msg.sender,
            _opponent,
            _description,
            msg.value,
            deadline
        );
    }

    /**
     * @dev 标记契约完成
     * @param _pactId 契约ID
     */
    function markAsFinished(uint256 _pactId) external {
        Pact storage pact = pacts[_pactId];
        if (pact.creator == address(0)) revert PactNotFound();
        if (pact.resolved) revert PactAlreadyResolved();
        if (msg.sender != pact.creator && msg.sender != pact.opponent)
            revert NotParticipant();

        if (msg.sender == pact.creator) {
            if (pact.creatorFinished) revert AlreadyFinished();
            pact.creatorFinished = true;
        } else {
            if (pact.opponentFinished) revert AlreadyFinished();
            pact.opponentFinished = true;
        }

        emit PactFinished(_pactId, msg.sender);
    }

    /**
     * @dev 结算契约
     * @param _pactId 契约ID
     */
    function resolvePact(uint256 _pactId) external {
        Pact storage pact = pacts[_pactId];
        if (pact.creator == address(0)) revert PactNotFound();
        if (pact.resolved) revert PactAlreadyResolved();
        if (block.timestamp < pact.deadline) revert PactNotExpired();

        pact.resolved = true;
        uint256 totalStake = pact.stake * 2; // 双方押金

        if (pact.creatorFinished && pact.opponentFinished) {
            // 双方都完成 - 平分押金
            payable(pact.creator).transfer(pact.stake);
            payable(pact.opponent).transfer(pact.stake);
            pact.winner = address(0); // 平局
        } else if (pact.creatorFinished && !pact.opponentFinished) {
            // 只有创建者完成 - 创建者获得全部押金
            payable(pact.creator).transfer(totalStake);
            pact.winner = pact.creator;
        } else if (!pact.creatorFinished && pact.opponentFinished) {
            // 只有对手方完成 - 对手方获得全部押金
            payable(pact.opponent).transfer(totalStake);
            pact.winner = pact.opponent;
        } else {
            // 双方都未完成 - 押金销毁
            payable(BURN_ADDRESS).transfer(totalStake);
            pact.winner = BURN_ADDRESS;
        }

        emit PactResolved(_pactId, pact.winner, totalStake);
    }

    /**
     * @dev 获取契约信息
     * @param _pactId 契约ID
     * @return 契约结构体
     */
    function getPact(uint256 _pactId) external view returns (Pact memory) {
        if (pacts[_pactId].creator == address(0)) revert PactNotFound();
        return pacts[_pactId];
    }

    /**
     * @dev 获取用户相关的所有契约ID
     * @param _user 用户地址
     * @return 契约ID数组
     */
    function getUserPacts(
        address _user
    ) external view returns (uint256[] memory) {
        uint256[] memory userPacts = new uint256[](nextPactId - 1);
        uint256 count = 0;

        for (uint256 i = 1; i < nextPactId; i++) {
            if (pacts[i].creator == _user || pacts[i].opponent == _user) {
                userPacts[count] = i;
                count++;
            }
        }

        // 调整数组大小
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = userPacts[i];
        }

        return result;
    }

    /**
     * @dev 获取契约总数
     * @return 契约总数
     */
    function getTotalPacts() external view returns (uint256) {
        return nextPactId - 1;
    }
}
