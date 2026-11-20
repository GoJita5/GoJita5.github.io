// Rotating ASCII torus, drawn into <pre id="ascii">.
(function () {
  var pre = document.getElementById("ascii");
  if (!pre) return;
  var shades = ".,-~:;=!*#$@";
  var fs = window.innerWidth < 600 ? 9 : 12;
  var cols, rows, A = 1.0, B = 0.5, last = 0;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function size() {
    pre.style.fontSize = fs + "px";
    pre.style.lineHeight = fs + "px";
    cols = Math.ceil(window.innerWidth / (fs * 0.6)) + 1;
    rows = Math.ceil(window.innerHeight / fs) + 1;
  }

  function frame() {
    var W = cols, H = rows, n = W * H;
    var b = new Array(n).fill(" "), z = new Float32Array(n);
    var K = Math.min(H * 1.1, W * 0.9);          // scale; limited by the smaller dimension
    var cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
    for (var j = 0; j < 6.28; j += 0.07) {
      var ct = Math.cos(j), st = Math.sin(j);
      for (var i = 0; i < 6.28; i += 0.03) {
        var sp = Math.sin(i), cp = Math.cos(i), h = ct + 2;
        var D = 1 / (sp * h * sA + st * cA + 5);
        var t = sp * h * cA - st * sA;
        var x = (W / 2 + K * D * (cp * h * cB - t * sB)) | 0;
        var y = (H / 2 + K * 0.5 * D * (cp * h * sB + t * cB)) | 0;
        var o = x + W * y;
        var N = 8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB);
        if (y > 0 && y < H && x > 0 && x < W && D > z[o]) {
          z[o] = D;
          b[o] = shades[N > 0 ? Math.min(N | 0, 11) : 0];
        }
      }
    }
    var out = "";
    for (var r = 0; r < H; r++) out += b.slice(r * W, (r + 1) * W).join("") + "\n";
    pre.textContent = out;
  }

  function loop(ts) {
    if (ts - last > 40) { A += 0.035; B += 0.018; frame(); last = ts; }
    requestAnimationFrame(loop);
  }

  size(); frame();
  window.addEventListener("resize", function () { size(); frame(); });
  if (!reduce) requestAnimationFrame(loop);
})();
