body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: black; color: white; overflow: hidden; font-family: sans-serif; }
#mainFeed { width: 100%; height: 100%; overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none; }
.post-container { width: 100vw; height: 100vh; scroll-snap-align: start; position: relative; display: flex; align-items: center; justify-content: center; }
.post-media { width: 100%; height: 100%; object-fit: contain; }
.post-sidebar { position: absolute; right: 15px; bottom: 120px; display: flex; flex-direction: column; align-items: center; }
.action-item { margin-bottom: 20px; text-align: center; }
.action-item i { font-size: 30px; color: white; filter: drop-shadow(0 0 5px rgba(0,0,0,0.5)); }
.action-item span { font-size: 12px; display: block; margin-top: 5px; }
.post-footer { position: absolute; bottom: 80px; left: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
.post-footer h4 { margin: 0; font-size: 18px; }
.post-footer p { margin: 5px 0; font-size: 14px; }
.post-footer b { color: #fe2c55; font-size: 20px; }
.bottom-nav { position: fixed; bottom: 0; width: 100%; height: 60px; background: black; border-top: 0.5px solid #333; display: flex; justify-content: space-around; align-items: center; }
.nav-item { color: #888; text-align: center; font-size: 10px; }
.nav-plus { background: linear-gradient(to right, #00f2ea, #fe2c55); width: 45px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: black; }
.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 1000; padding: 20px; }
.modal-content input, .modal-content textarea { width: 100%; padding: 12px; margin: 10px 0; border-radius: 5px; border: none; }
.post-btn { width: 100%; padding: 15px; background: #fe2c55; border: none; color: white; font-weight: bold; border-radius: 5px; }
.cancel-btn { width: 100%; padding: 10px; background: none; border: 1px solid white; color: white; margin-top: 10px; border-radius: 5px; }
