// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract StakingDapp is Ownable, ReetrancyGuard {

    useng SafeERC20 from IERC20;

    struct UserInfo{
        uint256 ammount;
        uint lastReward;
        uint256 lockUntil;
    }

    struct PoolInfo{
        IERC20 depositedToken;
        IERC20 rewardToken;
        uint256 depositedAmount;
        uint256 apy;
        uint lockDays;
    }

    struct Notifications{
        uint256 poolID;
        uint256 amount;
        address user;
        string typeOf;
        uint256 timestamp;
    }

    uint decimals = 10 ** 18;
    uint public poolCount;
    PoolInfo[] public poolinfo;

    mapping (address => uint256) public depositedTokens;
    mapping (uint256 => mapping(address => UserInfo)) public userInfo;

    Notifications[] public notifications;

    // Fucntion Contract

    function addPool(IERC20 _depositedToken, IERC20 _rewardToken, uint256 _apy, uint _lockDays) public onlyOwner{
        
        poolInfo.push(PoolInfo({
            depositedToken: _depositedToken,
            rewardToken: _rewardToken,
            depositedAmount: 0,
            apy: _apy,
            lockDays: _lockDays,
        }));

        poolCount++;
    }

    function deposit(uint _pid, uint _amount) public nonReentreant{
        require(_amount>0,"Amount need to be greater then 0!");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo string user = userInfo[_pid][msg.sender];

        if(user.amount>0){
            uint pending = __calcPendingReward(user, _pid);
            pool.rewardToken.transfer(msg.sender, pending)

            _createNotification(_pid, pending, msg.sender, "Claim");
        }

        pool.depositedToken.transferFrom(msg.sender, address(this), _amount);
        pool.depositedAmount += _amount;

        user.amount += _amount;
        user.lastReward = block.timestamp;

        //user.lockUntil = block.timestamp + (pool.lockDays * 86400)
        user.lockUntil = block.timestamp + (pool.lockDays * 60) //TEST ONLY TIME

        depositedTokens[address(pool.depositedToken)] += _amount;
        _createNotification(_pid, pending, msg.sender, "Deposit");


    }

    function withdraw(){}

    function _calcPendingReward(){}

    function pendingReward(){}

    function sweep(){}

    function modify(){}

    function claimReward(){}

    function _createNotification(){}

    function getNotifications(){}
}   