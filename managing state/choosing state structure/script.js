//When you make a component that  holds state, youll have to make some choices about how many state variables to have and
//what shape their state should be. 

//Its possible to write correct programs with suboptimal state structure, but there are a few things you should follow
//for good structure.

//1. Group related state
//If you always update two or more state variables at the same time, consider grouping them into one state.

//2. Avoid contradictions in state
//When the state is structured in a way that several pieces may contradict and disagree