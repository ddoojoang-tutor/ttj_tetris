const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    // 창 크기
    width: 600,                   // 가로
    height: 1000,                  // 세로
    minWidth: 500,                // 최소 가로
    minHeight: 900,               // 최소 세로
    
    // 웹 설정
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    
    // 아이콘
    icon: path.join(__dirname, 'assets/icon.png')
  })

  // 메뉴바 숨기기
  Menu.setApplicationMenu(null)
  
  // 개발자 도구 열기
  // mainWindow.webContents.openDevTools()

  mainWindow.loadFile('index.html')
}

// IPC 통신으로 링크 열기 처리
ipcMain.on('open-external-link', (event, url) => {
  shell.openExternal(url)
})

ipcMain.on('open-docs-window', (event, url) => {
  const docsWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  
  docsWindow.loadURL(url)
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})