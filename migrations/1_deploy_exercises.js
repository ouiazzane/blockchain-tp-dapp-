const Exercise1_SimpleStorage = artifacts.require('Exercise1_SimpleStorage');
const Exercise2_Counter = artifacts.require('Exercise2_Counter');
const Exercise3_Bank = artifacts.require('Exercise3_Bank');
const Exercise4_Voting = artifacts.require('Exercise4_Voting');
const Exercise5_SimpleToken = artifacts.require('Exercise5_SimpleToken');
const Exercise6_TodoList = artifacts.require('Exercise6_TodoList');
const Exercise7_Whitelist = artifacts.require('Exercise7_Whitelist');
const Exercise8_EventLogger = artifacts.require('Exercise8_EventLogger');

module.exports = async function (deployer) {
  await deployer.deploy(Exercise1_SimpleStorage);
  await deployer.deploy(Exercise2_Counter);
  await deployer.deploy(Exercise3_Bank);
  await deployer.deploy(Exercise4_Voting);
  await deployer.deploy(Exercise5_SimpleToken);
  await deployer.deploy(Exercise6_TodoList);
  await deployer.deploy(Exercise7_Whitelist);
  await deployer.deploy(Exercise8_EventLogger);
};
