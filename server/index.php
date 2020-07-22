<html>
   <head></head>
   <body>
      <h2>OxfitnessLab</h2>
      <h2>registration page</h2>
      <script></script>
      <p>First Paragraph</p>
      <p>Second Paragraph</p>
      <p>Yet one more Paragraph</p>
      <video id="player-ox" src="https://player.vimeo.com/external/412136588.hd.mp4?s=7097bb39bf032d4dbbc5626aa3a3a3b2a83229a3&amp;profile_id=175" width="100%" height="500px" style="border: solid 3px blue" controlslist="nodownload" controls=""></video>
      <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
      <script>
         $( "p" ).click(function() {
           var obj = { type: 'video',push_url: 'https://player.vimeo.com/external/412136588.hd.mp4?s=7097bb39bf032d4dbbc5626aa3a3a3b2a83229a3&profile_id=175' };
         
           var myJSON = JSON.stringify(obj);
         
                   // $( this ).slideUp();
                   window.ReactNativeWebView.postMessage(myJSON)
                   
         
                 });
               
      </script>
   </body>
</html>