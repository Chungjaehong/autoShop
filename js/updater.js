    originalFs = require('original-fs');
	got = require('got');

	var myProgress = new AXProgress();
	var remote = require('electron').remote;     

	if( remote.getGlobal('sharedObj').prop1 == 1){
        
		//location.replace("main.html");
	}

	progStart = function(){
		mask.open();
		myProgress.start(function(){
			//trace(this);
			if(this.isEnd){
				//toast.push("progress end");

			}else{
				myProgress.update(); // 프로그레스의 다음 카운트를 시작합니다.
			}	
		}, 
		{
			totalCount:100,
			width:500, 
			top:200, 
			title:"업데이트 중..."
		});
	}

	varVersion = 1.025;
	
	$("#appVersion").text("APP Ver : "+varVersion);
	
	updateVersionChk = function(){
		got('https://raw.githubusercontent.com/Chungjaehong/autoShop/master/README.md')
		.then(response => {
			console.log("web Version>>"+response.body);
			console.log("app Version>>"+varVersion);

			if(response.body > varVersion){
				progStart();
				
				got.stream('https://github.com/Chungjaehong/autoShop/raw/master/LinkUP-win32-x64/resources/app.asar').pipe(
					originalFs.createWriteStream('resources/app.asar')
					.on('finish', () => {
							myProgress.close();
							mask.close();
							console.log("update Finish");
							
							alert("업데이트 완료. \n다시 실행 하시기 바랍니다.");
							window.close();
						}
					)
				);

			}
		}).catch(error => {
			console.log(error.response.body);
		});

	}

	updateVersionChk();

	loginFlagChange = function(){
		remote.getGlobal('sharedObj').prop1 = 1;     
		var ipcRenderer = require('electron').ipcRenderer;
		ipcRenderer.send('show-prop1');    
	}
