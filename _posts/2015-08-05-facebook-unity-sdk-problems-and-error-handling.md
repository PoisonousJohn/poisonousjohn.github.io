---
id: 344
title: Facebook Unity SDK Problems and Error Handling
date: 2015-08-05T10:58:45+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=344
permalink: /gamedev/unity/facebook-unity-sdk-problems-and-error-handling.html
dsq_thread_id:
  - "6110913687"
image: /wp-content/uploads/2014/05/67a6bfe5cb2.png
categories:
  - Unity
tags:
  - 'c#'
  - Facebook
  - unity
---
<a href="http://fateev.pro/wp-content/uploads/2014/05/67a6bfe5cb2.png"><img class="alignleft wp-image-307 size-medium" src="http://fateev.pro/wp-content/uploads/2014/05/67a6bfe5cb2-300x300.png" alt="Facebook Unity SDK" width="300" height="300" /></a>

Unity is quite useful. But every tool has its own cons. One of that cons is a WWW class - some kind of HTTP wrapper. You might say: "What's wrong with it? It's quite handy!". Yes, it is, till you need to work with some kind of REST API.<!--more-->

Most of the REST services and also OAuth 2.0 spec using http error codes to inform user about some kind of error. But along with error code service provides response that contains details about an error because just an error code is not enough to understand what to do with such error. Facebook Open Graph API is one of such services. <a href="https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4#errors" target="_blank" rel="nofollow">Documentation states</a> that in case of error we should parse JSON response and look to the error code and other error details to understand what's wrong.
Common error response looks like this:
<pre> {% highlight javascript %}
      {
       "error": {
         "message": "Message describing the error",
         "type": "OAuthException",
         "code": 190,
         "error_subcode": 460,
         "error_user_title": "A title",
         "error_user_msg": "A message"
       }
     }
 {% endhighlight %}
</pre>
The most important error in my case is <strong>invalid token</strong>. In that case we should reauthorize user in our app. If it won't be done, all queries to API will fail. This breaks all the things. Facebook Unity SDK provides <strong>FBResult</strong> class to read repsonse from facebook's API. Problem that I'm talking about is that
<blockquote><strong> You can't use FBResult to handle facebook API errors.</strong></blockquote>
You might say: Why? It has an <strong>FBResult.Error</strong> property for that". But what that property is for? It has a string type and all you can get from it is a text description of an error like "400 Bad Response". Is that informative for you? Neither for me. Open graph API returns 400 http error code if ANY error occurs. I assumed that <strong>FBResult.Text</strong> property should contain a JSON describing the error like stated in documentation. It's not! You can't retrieve error's JSON! Why?
<blockquote><strong>Unity's WWW class doesn't allow you to get response if error code not equals 200 (Success). </strong></blockquote>
If you look at FBResult class in a debugger while receiving a response you see that FBResult's contains a data member which value is a WWW object. That's why the FBResult.Text property is empty when an error occurs. You might see an error in unity's console in such case: <strong>"You are trying to load data from a www stream which had the following error when downloading. 400 Bad Request".</strong>

It's absolutely pointless to forbid read a response if the response code not equals 200. It violates OAuth specifications. It's a bug and it exists in unity for years. Facebook developers that worked with Facebook Unity SDK knew it for sure and just ignored it. They just don't care about it. Facebook Unity SDK is outdated and updated rarely. Features like Share Dialog isn't supported.

Fortunately Open Graph SDK provides error details in HTTP Headers! To solve problem with error handling I use some hack. I would avoid it if situation wouldn’t be so awful. I use reflection to get protected FBResult.data field. As I mentioned before that field contains WWW object that I can use to retrieve http headers. Here is a part of my class:
<pre>{% highlight c# %}
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Reflection;

using LitJson;

using Glu.ContractKiller3;
using Glu.Localization;
using Glu.JSON;

namespace Glu.Facebook
{
    public class SDKError
    {
        public string message;
        public string type;
        public int code;
        public int error_subcode;
        public string error_user_title;
        public string error_user_msg;

        public static SDKError CreateFromHeaders(Dictionary&lt;string, string&gt; headers)
        {
            if (headers.ContainsKey("WWW-AUTHENTICATE"))
            {
                string header = headers["WWW-AUTHENTICATE"];
                var components =
                    Regex
                        .Matches(header, @"(?[^\s""]+)|""(?[^""]*)""")
                        .Cast().ToList()
                    .Select(m =&gt; m.Groups["match"].Value)
                    .ToList();
                if (components != null &amp;&amp;
                    components.Count == 4 &amp;&amp;
                    components[0] == "OAuth" &amp;&amp;
                    components[1] == "Facebook Platform")
                {
                    var err = new SDKError();
                    err.SetOAuthError();
                    err.SetReloginRequired();
                    err.message = components[3];
                    err.error_user_title = "Facebook Error";
                    err.error_user_msg = err.message;
                    return err;
                }
            }
            return null;
        }

    }

    static class SDKErrorExtensions
    {
        public static SDKError ToSDKError(this FBResult result)
        {
            SDKError err = null;

            if (result != null)
            {
                if (_fbResultDataField == null)
                {
                    _fbResultDataField = result.GetType().GetField("data", BindingFlags.NonPublic | BindingFlags.Instance);
                }


                var www = _fbResultDataField.GetValue(result) as UnityEngine.WWW;
                if (www != null)
                {
                    if (www.bytesDownloaded == 0 || www.responseHeaders.Count == 0)
                    {
                        err = SDKError.CreateNetworkError();
                    }
                    else
                    {
                        err = SDKError.CreateFromHeaders(www.responseHeaders);
                    }
                }

            }



            return err;
        }

        private static FieldInfo _fbResultDataField;

    }
}

{% endhighlight %}
</pre>
I cache FieldInfo to make reflection queries a little bit faster. Also I check bytesDownloaded and response headers to know if error caused by network problems. If not I check WWW-AUTHENTICATE header that facebook fills with error details. Regular expression required to parse a data in the header. Example of a Header's data:
<pre>OAuth "Facebook Platform" "invalid_token" "Token is invalid because user logged out."
</pre>
As you see the data format is kind of odd. But I retrieve data by sentences (a single word OR a statement between double quotes). Last part of a header is a message that we can log or display to user. invalid_token chunk looks like error type, so we can use it to decide how to deal with this error.

As an alternative to my hack you can use WebRequest but I wouldn't recommend rely on it.