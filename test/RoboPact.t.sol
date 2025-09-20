// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/RoboPact.sol";

contract RoboPactTest is Test {
    RoboPact public roboPact;
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public charlie = makeAddr("charlie");

    function setUp() public {
        roboPact = new RoboPact();

        // 给测试账户一些 ETH
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.deal(charlie, 10 ether);
    }

    function testCreatePact() public {
        vm.prank(alice);
        uint256 stake = 0.01 ether;
        uint256 duration = 7 days;

        roboPact.createPact{value: stake}("每天跑步30分钟", bob, duration);

        RoboPact.Pact memory pact = roboPact.getPact(1);
        assertEq(pact.creator, alice);
        assertEq(pact.opponent, bob);
        assertEq(pact.stake, stake);
        assertEq(pact.deadline, block.timestamp + duration);
        assertFalse(pact.creatorFinished);
        assertFalse(pact.opponentFinished);
        assertFalse(pact.resolved);
    }

    function testCreatePactWithZeroStake() public {
        vm.prank(alice);
        vm.expectRevert("Stake must be greater than 0");
        roboPact.createPact{value: 0}("每天跑步30分钟", bob, 7 days);
    }

    function testCreatePactWithSelf() public {
        vm.prank(alice);
        vm.expectRevert("Cannot create pact with yourself");
        roboPact.createPact{value: 0.01 ether}("每天跑步30分钟", alice, 7 days);
    }

    function testMarkAsFinished() public {
        // 创建契约
        vm.prank(alice);
        roboPact.createPact{value: 0.01 ether}("每天跑步30分钟", bob, 7 days);

        // 创建者标记完成
        vm.prank(alice);
        roboPact.markAsFinished(1);

        RoboPact.Pact memory pact = roboPact.getPact(1);
        assertTrue(pact.creatorFinished);
        assertFalse(pact.opponentFinished);

        // 对手方标记完成
        vm.prank(bob);
        roboPact.markAsFinished(1);

        pact = roboPact.getPact(1);
        assertTrue(pact.creatorFinished);
        assertTrue(pact.opponentFinished);
    }

    function testResolvePactBothFinished() public {
        // 创建契约
        vm.prank(alice);
        roboPact.createPact{value: 0.01 ether}("每天跑步30分钟", bob, 1 days);

        // 双方都标记完成
        vm.prank(alice);
        roboPact.markAsFinished(1);
        vm.prank(bob);
        roboPact.markAsFinished(1);

        // 快进到过期时间
        vm.warp(block.timestamp + 1 days + 1);

        uint256 aliceBalanceBefore = alice.balance;
        uint256 bobBalanceBefore = bob.balance;

        // 结算契约
        vm.prank(alice);
        roboPact.resolvePact(1);

        RoboPact.Pact memory pact = roboPact.getPact(1);
        assertTrue(pact.resolved);
        assertEq(pact.winner, address(0)); // 平局

        // 检查余额 - 双方都应该收到自己的押金
        assertEq(alice.balance, aliceBalanceBefore + 0.01 ether);
        assertEq(bob.balance, bobBalanceBefore + 0.01 ether);
    }

    function testResolvePactOnlyCreatorFinished() public {
        // 创建契约
        vm.prank(alice);
        roboPact.createPact{value: 0.01 ether}("每天跑步30分钟", bob, 1 days);

        // 只有创建者标记完成
        vm.prank(alice);
        roboPact.markAsFinished(1);

        // 快进到过期时间
        vm.warp(block.timestamp + 1 days + 1);

        uint256 aliceBalanceBefore = alice.balance;

        // 结算契约
        vm.prank(alice);
        roboPact.resolvePact(1);

        RoboPact.Pact memory pact = roboPact.getPact(1);
        assertTrue(pact.resolved);
        assertEq(pact.winner, alice);

        // 检查余额 - 创建者应该收到全部押金
        assertEq(alice.balance, aliceBalanceBefore + 0.02 ether);
    }

    function testResolvePactOnlyOpponentFinished() public {
        // 创建契约
        vm.prank(alice);
        roboPact.createPact{value: 0.01 ether}("每天跑步30分钟", bob, 1 days);

        // 只有对手方标记完成
        vm.prank(bob);
        roboPact.markAsFinished(1);

        // 快进到过期时间
        vm.warp(block.timestamp + 1 days + 1);

        uint256 bobBalanceBefore = bob.balance;

        // 结算契约
        vm.prank(alice);
        roboPact.resolvePact(1);

        RoboPact.Pact memory pact = roboPact.getPact(1);
        assertTrue(pact.resolved);
        assertEq(pact.winner, bob);

        // 检查余额 - 对手方应该收到全部押金
        assertEq(bob.balance, bobBalanceBefore + 0.02 ether);
    }

    function testResolvePactNeitherFinished() public {
        // 创建契约
        vm.prank(alice);
        roboPact.createPact{value: 0.01 ether}("每天跑步30分钟", bob, 1 days);

        // 快进到过期时间
        vm.warp(block.timestamp + 1 days + 1);

        uint256 burnAddressBalanceBefore = address(
            0x000000000000000000000000000000000000dEaD
        ).balance;

        // 结算契约
        vm.prank(alice);
        roboPact.resolvePact(1);

        RoboPact.Pact memory pact = roboPact.getPact(1);
        assertTrue(pact.resolved);
        assertEq(pact.winner, 0x000000000000000000000000000000000000dEaD);

        // 检查余额 - 押金应该被销毁
        assertEq(
            address(0x000000000000000000000000000000000000dEaD).balance,
            burnAddressBalanceBefore + 0.02 ether
        );
    }

    function testGetUserPacts() public {
        // 创建多个契约
        vm.prank(alice);
        roboPact.createPact{value: 0.01 ether}("任务1", bob, 7 days);

        vm.prank(bob);
        roboPact.createPact{value: 0.02 ether}("任务2", charlie, 7 days);

        vm.prank(alice);
        roboPact.createPact{value: 0.03 ether}("任务3", charlie, 7 days);

        // 获取 Alice 的契约
        uint256[] memory alicePacts = roboPact.getUserPacts(alice);
        assertEq(alicePacts.length, 2);
        assertEq(alicePacts[0], 1);
        assertEq(alicePacts[1], 3);

        // 获取 Bob 的契约
        uint256[] memory bobPacts = roboPact.getUserPacts(bob);
        assertEq(bobPacts.length, 2);
        assertEq(bobPacts[0], 1);
        assertEq(bobPacts[1], 2);

        // 获取 Charlie 的契约
        uint256[] memory charliePacts = roboPact.getUserPacts(charlie);
        assertEq(charliePacts.length, 2);
        assertEq(charliePacts[0], 2);
        assertEq(charliePacts[1], 3);
    }
}
