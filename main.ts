function distress_signal () {
    time_passed = control.millis()
    while (control.millis() - time_passed < 30000 && alarm) {
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
        radio.setGroup(66)
        // Skickar Signal till Microbit 4 (police)
        radio.sendString("INTRUSION_DETECTED")
        basic.showIcon(IconNames.Sad)
        radio.setGroup(65)
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendString("TURN_ON/OFF")
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
    } else if (receivedString == "DETECTED" && turned_on) {
        alarm = true
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("DETECTED")
})
let time_passed = 0
let alarm = false
let turned_on = false
turned_on = false
alarm = false
radio.setGroup(65)
basic.forever(function () {
    if (alarm) {
        distress_signal()
    }
})
