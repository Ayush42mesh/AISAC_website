export const events = [
 ['Faculty Frenzy','PAC-MAN','A tribute to the real high-score holders: our teachers. Chase clues, dodge ghosts, and team up with your favorite faculty.','pacman','#f5db64'],
 ['Midnight Circuit','RETRO RACER','Hit the starting line for head-to-head racing, neon checkpoints, and a campus championship.','joystick','#5de8ef'],
 ['Ghost Protocol','GHOST HUNT','Follow the clues through a transformed campus. Your squad has one night to solve the mystery.','ghost','#fa54bd'],
 ['Insert Knowledge','COIN-OP TRIVIA','Pop culture, wild facts, and rapid-fire rounds. Put your collective brainpower on the leaderboard.','coin','#f5db64'],
 ['Pixel Perfect','PIXEL ART','Build a tiny world with a big idea. A collaborative pixel-art jam for every kind of creative.','ghost','#5de8ef'],
 ['Boss Level','FIGHTER NIGHT','Friendly rivalries, knockout brackets, and one ultimate champion. Bring your best combo.','joystick','#fa54bd'],
 ['Golden Hour','COIN QUEST','A campus-wide treasure hunt. Crack the riddles and collect coins before the clock runs out.','coin','#f5db64'],
 ['Neon Knockout','RETRO SPORTS','Old-school games meet an all-new sports night, with teams, twists, and plenty of bragging rights.','joystick','#5de8ef'],
 ['Power-up Party','DANCE ARCADE','Follow the beat from warm-up to final boss. A rhythm-fueled dance night for the whole campus.','pacman','#fa54bd'],
 ['Space Invaders','COSMIC QUIZ','An interstellar team challenge packed with science, strategy, and unexpected encounters.','ghost','#5de8ef'],
 ['Extra Life','CHARITY PLAY','Play for a purpose. Every challenge completed contributes to our student community fund.','coin','#f5db64'],
 ['The Final Save','SEASON FINALE','One last night, every game, all your people. Celebrate the season and crown the campus champions.','pacman','#fa54bd']
].map(([title,subtheme,description,iconType,accentColor],i)=>({id:i,title,subtheme,description,iconType,accentColor,category:['Social','Competition','Discovery','Competition','Discovery','Competition','Discovery','Competition','Social','Discovery','Social','Social'][i]||'Discovery',date:`${String(9+i*2).padStart(2,'0')} OCT`,time:'6:00 PM',venue:i%2?'Student Commons':'The Main Quadrangle'}));
