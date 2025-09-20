// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../contracts/RoboPact.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        RoboPact roboPact = new RoboPact();

        vm.stopBroadcast();

        console.log("RoboPact deployed at:", address(roboPact));
    }
}
