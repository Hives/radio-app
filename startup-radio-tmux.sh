#! /usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

SESSION="radio"

tmux new-session -d -s $SESSION -n 'Main'
tmux send-keys -t 'Main' 'clear' C-m

tmux new-window -t $SESSION -n 'Back end' -c 'back-end'
tmux send-keys -t 'Back end' 'clear' C-m 'yarn start' C-m

tmux new-window -t $SESSION -n 'Front end' -c 'front-end'
tmux send-keys -t 'Front end' 'clear' C-m 'yarn serve' C-m

tmux select-window -t 'Main'
