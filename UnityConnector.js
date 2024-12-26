
function claimReward(id)
{
  if (id == PROMO_NAMES_TwelvePercent)
  {
    postStory();
  }
  else if (id == PROMO_NAMES_SevenPercent)
  {
    myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_SetActivePromoCode, SECOND_PROMO);     
    myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_SetNewState, USER_STATES_RewardClaimed);
  }
}

function checkSubscribe()
{  
  console.log("check sub");
  
  vkBridge.send('VKWebAppJoinGroup', {
  group_id: VK_PUBLIC_ID
  })
  .then((data) => { 
    if (data.result) {
      console.log(data);
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

function onGameSceneInited()
{
  console.log("game scene inited");    
  alert(myGameInstance == null); // VOT PROBLEMA!
  myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_SetNewState, USER_STATES_NotSubscribed);
  checkSubscribe();
}

function onSDKInited()
{
  console.log("sdk inited");    
}

function onGameCompleted()
{
  console.log("game completed");
  myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_SetNewState, USER_STATES_GameCompleted);
}

function onGameStarted()
{
  console.log("game started");
}

function getPromoCode(str)
{
  alert(str);
}

function subToVKEvents()
{  
  vkBridge.subscribe(event => {          
    if (event.detail.type == 'VKWebAppShowStoryBoxResult')
    {
        if (event.detail.data.result) 
        {
          myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_SetActivePromoCode, FIRST_PROMO);
          myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_SetNewState, USER_STATES_RewardClaimed);
        } 
    }
    else if (event.detail.type == "VKWebAppJoinGroupResult")
    {
        if (event.detail.data.result) 
        {
          alert("subbed");
          myGameInstance.SendMessage(UNITY_CONNECTOR_NAME, UnityConnector_LoadUserState); // load
        }
    }
  });
}

function postStory()
{
    vkBridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    url : STORY_IMAGE_URL,
    attachment: {
      text: 'book',
      type: 'photo',
      owner_id: 743784474,
      id: 12345678
    }})
    .then((data) => {
      if (data.code_data) {
        console.log(data);
      }})
    .catch((error) => {
      console.log(error);
    });
}

// App Init
jQuery(document).ready(function($)
{
  vkBridge.send('VKWebAppInit');

  subToVKEvents();
}); 

