// Detectar a própria pasta de execução
var fso = new ActiveXObject("Scripting.FileSystemObject");
var scriptPath = WScript.ScriptFullName;
var dir = fso.GetParentFolderName(scriptPath);

// Gerar nome aleatório para o putty.exe
function randomName(len) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var name = "";
    for (var i = 0; i < len; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}
var exeName = randomName(8) + ".exe";
var exePath = dir + "" + exeName;

// Baixar e salvar o putty.exe na mesma pasta
var url = "https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe";
var xHttp = new ActiveXObject("Microsoft.XMLHTTP");
xHttp.open("GET", url, false);
xHttp.send();
if (xHttp.status === 200) {
    var stream = new ActiveXObject("ADODB.Stream");
    stream.Type = 1;
    stream.Open();
    stream.Write(xHttp.responseBody);
    stream.SaveToFile(exePath, 2);
    stream.Close();
    var shell = new ActiveXObject("WScript.Shell");
    shell.Run('"' + exePath + '"', 1, false);
} else {
    WScript.Echo("Erro ao baixar: " + xHttp.status);
}
