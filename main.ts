function vait () {
    // Skickar signal till Microbit 3
    radio.sendString("ALARM_IS_ON")
    time_passed = control.millis()
    while (control.millis() - time_passed < 10000 && alarm) {
        music.play(music.tonePlayable(175, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.clearScreen()
        basic.pause(200)
    }
    if (alarm) {
        // Skickar Signal till Microbit 4 (police)
        radio.sendString("INTRUSION_DETECTED")
    }
}
input.onButtonPressed(Button.A, function () {
    alarm = true
    vait()
})
radio.onReceivedString(function (receivedString) {
    // Microbit 3 sätter på eller stänger av systemet
    // Microbit 1 skickar signal och aktiverar larm
    if (receivedString == "TURN_ON/OFF") {
        if (turned_on) {
            turned_on = false
            alarm = false
        } else {
            turned_on = true
        }
    } else if (receivedString == "DETECTED") {
        alarm = true
        vait()
    }
})
input.onButtonPressed(Button.B, function () {
    alarm = false
})
let time_passed = 0
let alarm = false
let turned_on = false
turned_on = false
alarm = false
radio.setGroup(65)
