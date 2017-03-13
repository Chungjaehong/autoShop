(function(){
        
		fnObj = {
				pageStart: function () {
						//fnObj.grid.bind();
                        //fnObj.groupGrid.bind();
				},
				usergrid: {//캠페인 그룹 그리드
						target: new AXGrid(),
						bind: function () {
								window.usergrid = fnObj.usergrid.target;
								/*grpInfo.id = grpList[i].attributes[1].value;
								grpInfo.name = grpList[i].innerText;
								grpInfo.campId*/
								var getColGroup = function () {
										return [
												{key: "pcChannelKey", label: "사이트명", width: "200"},
												{key: "name", label: "그룹명", width: "*"},
												{key: "no", label: "동기화", width: "100", align: "center", formatterLabel:"동기화",formatter: "checkbox"}
										];
								};
								usergrid.setConfig({
										targetID: "userDataGrid",
										sort: true, //정렬을 원하지 않을 경우 (tip
										colHeadTool: true, // column tool use
										fitToWidth: false, // 너비에 자동 맞춤
										colGroup: getColGroup(),
										height : 500,
										colHeadAlign: "center", // 헤드의 기본 정렬 값. colHeadAlign 을 지정하면 colGroup 에서 정의한 정렬이 무시되고 colHeadAlign : false 이거나 없으면 colGroup 에서 정의한 속성이 적용됩니다.
										body: {
												//onclick: function () {
												//		toast.push(Object.toJSON({"event": "click", "index": this.index, "r": this.r, "c": this.c, "item": this.item}));
														// this.list, this.page
												//},
												addClass: function () {
														return (this.index % 2 == 0 ? "blue" : "blue"); // red, green, blue, yellow, white, gray
												}
										},
										page: {
												display: false,
												paging: false
										}
								});
						},
						getSelectedItem: function () {
								trace(this.target.getSelectedItem());
								toast.push('콘솔창에 데이터를 출력하였습니다.');
						}
				},
                groupGrid: {//그룹 그리드 --> 입찰 화면
						target: new AXGrid(),
						bind: function () {
								window.groupGrid = fnObj.groupGrid.target;
								var getColGroup = function () {
										return [
												{key: "name", label: "그룹명", width: "*"},
												{key: "status", label: "상태", width: "200"},
												{key: "keyCout", label: "키워드수", width: "*"},
												{key: "biddingDtm", label: "입찰 시간", width: "*"},
										];
								};
								groupGrid.setConfig({
										targetID: "groupDataGrid",
										sort: true, //정렬을 원하지 않을 경우 (tip
										colHeadTool: true, // column tool use
										fitToWidth: true, // 너비에 자동 맞춤
										colGroup: getColGroup(),
										colHeadAlign: "center", // 헤드의 기본 정렬 값. colHeadAlign 을 지정하면 colGroup 에서 정의한 정렬이 무시되고 colHeadAlign : false 이거나 없으면 colGroup 에서 정의한 속성이 적용됩니다.
										passiveMode:true,
										
										body: {
												onclick: function () {
														//toast.push(Object.toJSON({"event": "click", "index": this.index, "r": this.r, "c": this.c, "item": this.item}));
														// this.list, this.page
														keywordGrid.setList(keyArData[this.index], null, "reload");
														clickGridGroupIndex = this.index;

												},
												addClass: function () {
														return (this.index % 2 == 0 ? "blue" : "blue"); // red, green, blue, yellow, white, gray
												}
										},
										page: {
												display: false,
												paging: false
										}
								});
						},
						getSelectedItem: function () {
								trace(this.target.getSelectedItem());
								toast.push('콘솔창에 데이터를 출력하였습니다.');
						}
				},
                keywordGrid: {//키워드 그리드 --> 입찰 화면
						target: new AXGrid(),
						bind: function () {
								window.keywordGrid = fnObj.keywordGrid.target;
								var getColGroup = function () {
										return [
												{key: "no", label: "체크", width: "100", align: "center", formatterLabel:"입찰",formatter: "checkbox"},
												{key: "keyword", label: "상품명", width: "150"},
												{key: "referenceKey", label: "상품ID", width: "100"},
												{key: "status", label: "상태", width: "70"},
												{key: "bidAmt", label: "입찰가", width: "100" ,formatter:"money"},
												/*{key: "NudeKeyword", label: "업체수", width: "80"},*/
												{key: "nowRank", label: "현재순위", width: "80",align:"right"},
												{key: "maxPay", label: "입찰 한도", width: "*",align:"right",
													formatter: "money",
														editor: {
															type: "text",
															maxLength: 10,
															updateWith: ["_CUD"],
															beforeUpdate: function (val) { // 수정이 되기전 value를 처리 할 수 있음.
																// 선택된 값은
																console.log(val);
																return val;
															},
															afterUpdate: function (val) { // 수정이 처리된 후
																// 수정이 된 후 액션.
																console.log(this);
															}
														} 
												},
												{key: "wantRank", label: "목표 순위", width: "*" ,align:"right",
													editor: {
														type: "select",
														updateWith: ["_CUD"],
														optionValue: "CD",
														optionText: "NM",
														options: [
															{CD: 1, NM: "1"},{CD: 2, NM: "2"},
															{CD: 3, NM: "3"},{CD: 4, NM: "4"},
															{CD: 5, NM: "5"},{CD: 6, NM: "6"},
															{CD: 7, NM: "7"},{CD: 8, NM: "8"},
															{CD: 9, NM: "9"},{CD: 10, NM: "10"},
															{CD: 11, NM: "11(비즈)"},{CD: 12, NM: "12(비즈)"},{CD: 13, NM: "13(비즈)"},
															{CD: 14, NM: "14(비즈)"},{CD: 15, NM: "15(비즈)"}
														],
														beforeUpdate: function (val) { // 수정이 되기전 value를 처리 할 수 있음.
															// 선택된 값은
															console.log(val);
															return val;
														},
														afterUpdate: function (val) { // 수정이 처리된 후
															// 수정이 된 후 액션.
															console.log(this);
														}
													}
												},
												{key: "biddingPay", label: "변동액", width: "*" , align:"right", formatter: "money",
                                                	editor: {
														type: "text",
														maxLength: 10,
														updateWith: ["_CUD"],
														beforeUpdate: function (val) { // 수정이 되기전 value를 처리 할 수 있음.
															// 선택된 값은
															console.log(val);
															return val;
														},
														afterUpdate: function (val) { // 수정이 처리된 후
															// 수정이 된 후 액션.
															console.log(this);
														}
													}
												},
												{key: "selectKeyword", label: "입찰검색어", width: "150"
													,editor: {
														type: "text",
														maxLength: 10,
														updateWith: ["_CUD"],
														beforeUpdate: function (val) { // 수정이 되기전 value를 처리 할 수 있음.
															// 선택된 값은
															console.log(val);
															return val;
														},
														afterUpdate: function (val) { // 수정이 처리된 후
															// 수정이 된 후 액션.
															console.log(this);
														}
													}
												}
												,
												  {
														key: "btns", label: "상세", width: "40", align: "center", formatter: function () {
															return '<button type="button" name="selectKeyword" onclick="fnObj.keywordGrid.selectKeyword(' + this.index + ');">◀</button>';
														}
                            					   },
										];
								};
								keywordGrid.setConfig({
										targetID: "keywordGrid",
										sort: true, //정렬을 원하지 않을 경우 (tip
										colHeadTool: true, // column tool use
										fitToWidth: false, // 너비에 자동 맞춤
										//fixedColSeq: 1,
										passiveMode:true,
										colGroup: getColGroup(),
										colHeadAlign: "center", // 헤드의 기본 정렬 값. colHeadAlign 을 지정하면 colGroup 에서 정의한 정렬이 무시되고 colHeadAlign : false 이거나 없으면 colGroup 에서 정의한 속성이 적용됩니다.
										body: {
												addClass: function () {
														return (this.index % 2 == 0 ? "blue" : "blue"); // red, green, blue, yellow, white, gray
												}
										},
										page: {
												display: false,
												paging: false
										}
								});
						},
						getSelectedItem: function () {
								trace(this.target.getSelectedItem());
								toast.push('콘솔창에 데이터를 출력하였습니다.');
						},
						selectKeyword: function(index){
							$.Event(event).stopPropagation(); 
							var myModal = new AXModal();
							myModal.openDiv({
									modalID:"modalDiv99",
									targetID:"modalSelectKey",
									width:450,
									top:150
							});
							clickShopGridIndex = index;

							fnObj.selectKeywordGrid.bind();
							selectKeywordGrid.setList(keyArData[clickGridGroupIndex][index].keywordAr, null, "reload");

						}
				},
				selectKeywordGrid: {//키워드 그리드 --> 입찰 화면
						target: new AXGrid(),
						bind: function () {
								window.selectKeywordGrid = fnObj.selectKeywordGrid.target;
								var getColGroup = function () {
										return [
												{key: "schKeyword", label: "키워드", width: "100"},
												{key: "clkCnt", label: "클릭수", width: "60"},
												{key: "salesAmt", label: "비용", width: "100" ,formatter:"money"},
												{key: "drtCrto", label: "전환율(%)", width: "100" }
										];
								};
								selectKeywordGrid.setConfig({
										targetID: "selectKeywordGrid",
										sort: true, //정렬을 원하지 않을 경우 (tip
										colHeadTool: true, // column tool use
										fitToWidth: false, // 너비에 자동 맞춤
										//fixedColSeq: 1,
										passiveMode:true,
										colGroup: getColGroup(),
										colHeadAlign: "center", // 헤드의 기본 정렬 값. colHeadAlign 을 지정하면 colGroup 에서 정의한 정렬이 무시되고 colHeadAlign : false 이거나 없으면 colGroup 에서 정의한 속성이 적용됩니다.
										body: {
												addClass: function () {
														return (this.index % 2 == 0 ? "blue" : "blue"); // red, green, blue, yellow, white, gray
												},
												ondblclick: function () {
													keyArData[clickGridGroupIndex][clickShopGridIndex].selectKeyword = keyArData[clickGridGroupIndex][clickShopGridIndex].keywordAr[this.index].schKeyword;
													keywordGrid.setList(keyArData[clickGridGroupIndex], null, "reload");
													var myModal = new AXModal();
													myModal.close('modalDiv99');
												}
										},
										page: {
												display: false,
												paging: false
										}
								});
						},
						getSelectedItem: function () {
								trace(this.target.getSelectedItem());
								toast.push('콘솔창에 데이터를 출력하였습니다.');
						}
				}



		};
		
}());