export const iconPaths = [
  '/static/icons/icon-design-default.png',
  '/static/icons/icon-diy-default.png',
  '/static/icons/icon-food-default.png',
  '/static/icons/icon-display-default.png',
  '/static/icons/icon-toilet-default.png',
]

export const marker = {
  width: 24,
  height: 37,
  iconPathToggle(){
    const {iconPath} = this
    if(iconPath.includes('default')){
      this.iconPath = iconPath.replace('default', 'active')
    }else{
      this.iconPath = iconPath.replace('active', 'default')
    }
  },
}