export const marker = {
  width: 24,
  height: 24,
  iconPath: '/static/icons/icon-coordinate-default.png',
  iconPathToggle(){
    const {iconPath} = this
    if(iconPath.includes('default')){
      this.iconPath = iconPath.replace('default', 'active')
    }else{
      this.iconPath = iconPath.replace('active', 'default')
    }
  },
}