Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
projectRoot = fso.GetParentFolderName(WScript.ScriptFullName)
pythonExe = "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
command = """" & pythonExe & """ -m http.server 4180 --bind 127.0.0.1"

shell.CurrentDirectory = projectRoot & "\dist"
shell.Run command, 0, False
