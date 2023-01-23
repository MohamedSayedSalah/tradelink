// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import "@stylesheets/application.css"
import mount from '@src/mount'
import "channels"

import { Home } from "@apps/home"


require('@rails/ujs').start()
require('@rails/activestorage').start()

document.addEventListener('DOMContentLoaded', () => {
    mount({
        Home,
    })
})// Support component names relative to this directory: