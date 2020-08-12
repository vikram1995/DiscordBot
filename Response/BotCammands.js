DatabaseSystem = require('../DatabaseSystem/SaveSystem');
const Discord = require('discord.js');

var LeaderBoard = function LeaderBoard() {
    return new Promise(async resolve => {
        var Udata = await DatabaseSystem.GetTopKarmaUsers();
        var leaderboardData = "";
        leaderboardData = leaderboardData + "Your Gurus Are\n"
        leaderboardData = leaderboardData + "User Name : Karma Points" + "\n";
        for (var i = 0; i < Udata.length; i++) {
            if (Udata[i].KarmaPoints != 0) {
                leaderboardData = leaderboardData + Udata[i].UserName + " : " + Udata[i].KarmaPoints + "\n";
            }
        }
        resolve(leaderboardData);
    });
}

var Points = function Points(UID) {
    return new Promise(async resolve => {
        var data = await DatabaseSystem.GetUsersPoints(UID);
        resolve("Your Karma points are : " + data.KarmaPoints);
    });
}

var Help = function Help() {
    return "here are some Commands You can Try \n* !help\n* !showid\n* !points\n* !leaderboard \n ---------------------------- \n* Team only commands **Works only in Bot Channel under Team** - \n* !giverole discordId,discordId roleId \n* !configstandup activate(true) RoleName channelname time1,time2,time3 time (tip - format 00:00 24hr format) \n* !createrole rolename permissions,permission2 (morehelp - if you do not write permission default perms will be applied) \n* !createchannel channelname categoryName rolename reasontoCreateChannel \n* !createcategory categoryName rolename reasontoCreateCategory \n* !givepermission channelname rolename \n Rock the commands ";
}

var GiveRole = function GiveRole(message,userId,batchId) { 
    return new Promise(async resolve => {
        //console.log(userId+" "+batchId);
        
        // !giverole cpp abc@gmail.com
        // get roles info from google spreadsheet (load it once only!)
        // decide which is the next role to be granted to the user 
        // verify the user is on the Target Colleges -> GCStudents sheet (they are in GC!)
        //load college studs from gc if email == emailgc bool isInSheet  = true
        // if isInGC true then only give them the cpp-group-X role 
        // write the email id, role given, userid to Daily Updates -> Roles sheet (userid = message.author.id)
        // for more info on google sheet integration ref - https://gist.github.com/mayankgrover/1be4978dec294863f14924de5ceecc5b
        //console.log(message);
        resolve("Granting discord id : " + userId +" role(batch) :"+batchId);
    });
}

var FindRoleMemberCount = async function FindRoleMemberCount(guild, roleName) { 
    var role = await FindRole(guild, roleName);
    if(role) { 
        return role.members.size;
    }

    return 0;
}

var FindRole = async function FindRole(guild, roleName) { 
    guild.roles.fetch(true);
    var role = guild.roles.cache.find(role => role.name === roleName);
    if(role) { 
        // console.log("Role found: " + role.id + ", name: " + roleName);
        return role;
    } else {
        console.log("Role not found: " + roleName);
        return null;
    }
}

function splitStr(str, seperator) { 
      
    // Function to split string 
    var string = str.split(seperator); 
      
    console.log(string); 
}

module.exports = {
    LeaderBoard,
    Points,
    Help,
    GiveRole,
    FindRole,
    FindRoleMemberCount
}
