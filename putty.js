var url = "https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe";
var temp = WScript.CreateObject("WScript.Shell").ExpandEnvironmentStrings("%TEMP%") + "\puttycyc.exe";
var xHttp = new ActiveXObject("Microsoft.XMLHTTP");
xHttp.open("GET", url, false);
xHttp.send();
if (xHttp.status === 200) {
    var stream = new ActiveXObject("ADODB.Stream");
    stream.Type = 1;
    stream.Open();
    stream.Write(xHttp.responseBody);
    stream.SaveToFile(temp, 2);
    stream.Close();
    var shell = new ActiveXObject("WScript.Shell");
    shell.Run('"' + temp + '"', 1, false);
} else {
    WScript.Echo("Erro ao baixar: " + xHttp.status);
}