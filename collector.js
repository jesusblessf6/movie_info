var fs = require('fs');
var async = require('async');
var allFiles = [];
var movieListFileName = 'movielist.txt';

async.series([
		function(callback){
			handleDir(process.argv[2], callback);
		},

		function(callback){
			//console.log(allFiles);

			fs.writeFile(movieListFileName, allFiles.join('\r\n'), function(err){
				if(err){
					console.dir(err);
				}
				callback();
			});
		}
	], function(err){
		if(err){
			console.dir(err);
		}
	});


function handleDir(path, callback){
	fs.readdir(path, function(err, files){
		async.each(files, function(fileName, next){
			var newPath = path + "/" + fileName;
			fs.stat(newPath, function(err, stats){
				if(stats.isDirectory()){
					handleDir(newPath, next);
				}else if(stats.isFile()){
					allFiles.push(newPath);
					console.log(newPath);
					next();
				}else{
					next();
				}
			});
		}, function(err){
			if(err){
				console.dir(err);
			}
			callback();
		});
	});
}
