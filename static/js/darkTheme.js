console.log('begin JS', localStorage.colorTheme)
if (localStorage.colorTheme === undefined) {
  localStorage.colorTheme = 'system'
}
if (localStorage.colorTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'night')
}
if (localStorage.colorTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'synthwave')
}
if (localStorage.colorTheme === 'system') {
  document.documentElement.removeAttribute('data-theme')
}
console.log('end JS', localStorage.colorTheme)
