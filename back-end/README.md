# Pauly's radio app, back end

## Installation

Execute `yarn` in this folder

## Execution

Update the value of `SIMPLE_MIXER_CONTROL` in `player.js` so it's the name of
the simple mixer control that `amixer` is going to control. On my laptop it's
`Mixer`, but on my Raspberry Pi it's `Speaker`. (It would be better if this was
in a config file that's not part of the code.)

Then execute `yarn start` in this folder.

You can also do `yarn start:dev`.

## Resources

BBC Radio stream urls: https://www.astra2sat.com/radio/bbc-radio/bbc-aac-radio-streams/
