const VK_PUBLIC_ID = 1;
const STORY_IMAGE_URL = "url";
const UNITY_CONNECTOR_NAME = "UnityConnector"


function checkSubscribe()
{
  alert("check sub");
}

function firstPromoUse()
{
  alert("first promo use");
}

function secondPromoUse()
{
  alert("second promo use);
}

jQuery(document).ready(function($)
{
  vkBridge.send('VKWebAppInit');

  subToAppShareEvent();
  subToPostStoryEvent();
}); 
