# Compare animation performance
React / SVG / Canvas で同様のパーティクルを動かしてパフォーマンス比較。  
[http://khirayama.github.io/compare-animation-performance/public/](http://khirayama.github.io/compare-animation-performance/public/)

結果としては
- React: 8 - 13 FPS
- SVG: 20 - 26 FPS
- Canvas: 25 - 32 FPS
  
画面サイズや実装方法で変わってくるところも多々あるとは思いつつ、だいたいこんな感じなのかなーとは。  
ReactはrequestAnimationFrame動いてない？らしく、スピード出ないっぽい。  
動いたら改善されるかなー

