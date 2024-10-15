class MainMenu {
  constructor() {
    const { Menu } = require("electron");
    let template = [
      {
        label: "File",
        submenu:[
            {
                label:"Close",
                role: "quit"
            }
        ]
      },
      {
        label: "Help",
        click: ()=>{
            const {shell}=require ('electron')
            shell.openExternal("https://electronjs.org")
        }
      },
      {
        label: "About",
        click: ()=>{
            const {dialog}=require ('electron')
            dialog.showMessageBox({
                type:"info",
                buttons:["OK"],
                title: "About",
                message:"Hello about"
            })
      },
    }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}
module.exports = { MainMenu };
