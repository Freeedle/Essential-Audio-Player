// Essential Audio Player v2.1
"use strict";
var Essential_Audio = (() => {
  var audioElements = {};
  var b = [];
  var c = false;
  var d = false;
  var autoplayInit = false;
  var h;
  var i;
  var j;
  var k = false;
  var l;
  var m = false;
  var o;
  var p;
  var duration = (audio) => {
    return audio.duration;
  };
  var currentTime = (audio) => {
    return audio.currentTime;
  };
  var buffered = (audio) => {
    return audio.buffered;
  };
  var po = (e) => {
    if (e.changedTouches) {
      j = Math.round(e.changedTouches[0].pageX);
    } else {
      j = Math.round(e.pageX);
    }
  };
  if (document.readyState != "loading") {
    setupPlayers();
  } else {
    document.addEventListener("DOMContentLoaded", setupPlayers);
  }
  var ie = false;
  try {
    var ig = Object.defineProperty({}, "passive", {
      get: () => {
        ie = true;
      },
    });
    document.addEventListener("ig", null, ig);
    document.removeEventListener("ig", null, ig);
  } catch (e) {}
  function setupPlayers() {
    var rootDiv = document.querySelectorAll("div.essential_audio");
    rootDiv.forEach((vo, ib) => {
      vo.innerHTML =
        '<div><div class="off"><!----></div></div><div><div><!----></div></div><div><!----></div>';
      var ic;
      if (vo.hasAttribute("id")) {
        ic = vo.getAttribute("id");
      } else {
        ic = "EAP_" + (ib + 1);
        vo.setAttribute("id", ic);
      }
      audioElements[ic] = document.createElement("audio");
      var a = audioElements[ic];
      a.id = ic;
      a.za = vo.querySelector("div:nth-child(1)").querySelector("div");
      a.zb = a.za.offsetWidth;
      a.zc = vo.querySelector("div:nth-child(3)");
      a.zd = vo.querySelector("div:nth-child(1)").offsetWidth - a.zb;
      if (a.zd < 0) {
        a.zd = 0;
      }
      a.ze = vo.getAttribute("data-url");
      a.zf = 0;
      a.zg = 0;
      a.zh = false;
      a.zis = 0;
      a.zj = false;
      a.zk = false;
      a.zl = false;
      a.zm = false;
      a.zn = false;
      a.zo = false;
      b[ib] = ic;
      a.crossOrigin = "anonymous";
      a.preload = "metadata";
      if (vo.hasAttribute("data-loop")) {
        a.loop = true;
      }
      if (vo.hasAttribute("data-scratch")) {
        a.zp = true;
      } else {
        a.zp = false;
      }
      if (vo.hasAttribute("data-passive")) {
        a.zq = true;
      } else {
        a.zq = false;
      }
      if (vo.hasAttribute("data-autoplay")) {
        if (!autoplayInit) {
          autoplayInit = true;
          a.autoplay = true;
          a.preload = "auto";
          c = a;
          E(a);
        }
      }
      if (vo.hasAttribute("data-preload")) {
        if (!a.autoplay) {
          a.preload = "auto";
          E(a);
        }
      }
      a.za.onmousedown = (e) => {
        if (!k) {
          po(e);
          window.addEventListener("mousemove", (e) => {
            po(e);
          });
          Ba(a);
        }
      };
      if (!a.zq) {
        a.za.ontouchstart = (e) => {
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(l);
          k = true;
          po(e);
          window.addEventListener("touchmove", (e) => {
            po(e);
          });
          Ba(a);
        };
      } else {
        a.za.addEventListener(
          "touchstart",
          (e) => {
            e.stopPropagation();
            clearTimeout(l);
            k = true;
            po(e);
            window.addEventListener("touchmove", (e) => {
              po(e);
            });
            Ba(a);
          },
          ie ? { passive: true } : false
        );
      }
      a.zc.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!k) {
          po(e);
          window.addEventListener("mousemove", (e) => {
            po(e);
          });
          Bb(a);
        }
      };
      if (!a.zq) {
        a.zc.ontouchstart = (e) => {
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(l);
          k = true;
          po(e);
          window.addEventListener("touchmove", (e) => {
            po(e);
          });
          Bb(a);
        };
      } else {
        a.zc.addEventListener(
          "touchstart",
          (e) => {
            e.stopPropagation();
            clearTimeout(l);
            k = true;
            po(e);
            window.addEventListener("touchmove", (e) => {
              po(e);
            });
            Bb(a);
          },
          ie ? { passive: true } : false
        );
      }
    });
  }
  function Ba(a) {
    a.zn = true;
    h = j;
    i = h - (a.za.getBoundingClientRect().left + window.scrollX);
    if (!k) {
      window.addEventListener("mousemove", Bc);
    } else {
      a.te = setTimeout(function () {
        window.addEventListener("touchmove", Bc);
        clearTimeout(a.te);
      }, 100);
    }
    function Bc() {
      if (h != j) {
        m = true;
        if (a.zd > 0) {
          a.za.classList.add("drag");
        }
      }
      if (m && a.zd > 0) {
        o =
          j -
          (a.za.parentNode.getBoundingClientRect().left + window.scrollX) -
          i;
        a.zf = Math.min(Math.max(o, 0), a.zd);
        a.za.style.left = a.zf + "px";
        if (a.zp && a.zl) {
          V(a);
          if (a.paused && currentTime(a) != duration(a)) {
            a.play();
          }
        }
      }
    }
    if (!k) {
      window.addEventListener("mouseup", Bd);
    } else {
      window.addEventListener("touchend", Bd);
    }
    function Bd() {
      clearTimeout(a.te);
      if (!k) {
        window.removeEventListener("mousemove", Bc);
        window.removeEventListener("mousemove", (e) => {
          po(e);
        });
        window.removeEventListener("mouseup", Bd);
      } else {
        window.removeEventListener("touchmove", Bc);
        window.removeEventListener("touchmove", (e) => {
          po(e);
        });
        window.removeEventListener("touchend", Bd);
      }
      if (m) {
        if (duration(a) && a.zd > 0) {
          if (!a.zp || !a.zl) {
            V(a);
          }
          if (a.zl && a.paused && currentTime(a) != duration(a)) {
            a.play();
          }
        }
        m = false;
        a.za.classList.remove("drag");
      } else {
        if (c.id && c.id == a.id && a.zl) {
          P(a);
        }
        if (!a.zj) {
          C(a);
        }
      }
      a.zn = false;
      if (k) {
        l = setTimeout(function () {
          k = false;
          clearTimeout(l);
        }, 150);
      }
    }
  }
  function Bb(a) {
    if (a.zd > 0) {
      a.zn = true;
      h = j;
      i = Math.floor(a.zb / 2);
      if (!k) {
        window.addEventListener("mousemove", Bf);
      } else {
        a.te = setTimeout(function () {
          window.addEventListener("touchmove", Bf);
          clearTimeout(a.te);
        }, 100);
      }
      function Bf() {
        m = true;
        a.za.classList.add("drag");
        o = j - a.za.parentNode.getBoundingClientRect().left - i;
        a.zf = Math.min(Math.max(o, 0), a.zd);
        a.za.style.left = a.zf + "px";
        if (a.zp && a.zl) {
          V(a);
          if (a.paused && currentTime(a) != duration(a)) {
            a.play();
          }
        }
      }
      if (!k) {
        window.addEventListener("mouseup", Bg);
      } else {
        window.addEventListener("touchend", Bg);
      }
      function Bg() {
        clearTimeout(a.te);
        if (!k) {
          window.removeEventListener("mousemove", Bf);
          window.removeEventListener("mousemove", (e) => {
            po(e);
          });
          window.removeEventListener("mouseup", Bg);
        } else {
          window.removeEventListener("touchmove", Bf);
          window.removeEventListener("touchmove", (e) => {
            po(e);
          });
          window.removeEventListener("touchend", Bg);
        }
        if (m) {
          if (duration(a)) {
            if (!a.zp || a.zl) {
              V(a);
            }
            if (a.zl && a.paused && currentTime(a) != duration(a)) {
              a.play();
            }
          }
          m = false;
          a.za.classList.remove("drag");
        } else {
          p = j - a.za.parentNode.getBoundingClientRect().left - i;
          a.zf = Math.min(Math.max(p, 0), a.zd);
          a.za.style.left = a.zf + "px";
          if (duration(a)) {
            V(a);
            if (a.zl) {
              a.play();
            }
          }
        }
        a.zn = false;
        if (k) {
          l = setTimeout(function () {
            k = false;
            clearTimeout(l);
          }, 150);
        }
      }
    }
  }
  function C(a) {
    if (c) {
      if (a.id == c.id) {
        stop();
        return;
      } else {
        stop();
      }
    }
    c = a;
    if (duration(a)) {
      O(a);
    } else {
      if (!a.zh) {
        E(a);
      }
    }
  }
  function D(a, vn) {
    a.za.setAttribute("class", "");
    a.za.classList.add(vn);
  }
  function E(a) {
    D(a, "load");
    a.zh = true;
    a.zk = true;
    a.onplay = () => {
      if (!a.zk) {
        clearTimeout(a.td);
        D(a, "play");
      }
      if (a.id == d.id) {
        c = a;
        d = false;
        a.zl = true;
        if (a.zd > 0) {
          a.tc = setInterval(Q, 50, a);
        }
      }
    };
    a.onplaying = () => {
      clearTimeout(a.td);
      D(a, "play");
    };
    a.onwaiting = () => {
      a.td = setTimeout(() => {
        D(a, "load");
      }, 50);
    };
    a.onpause = () => {
      if (!a.zk && !a.zn && !a.ended) {
        D(a, "off");
      }
      if (a.zl && !a.zk && !a.ended) {
        stop();
      }
    };
    a.onended = () => {
      if (a.zd == 0 && !a.loop) {
        stop(0);
      }
    };
    a.onseeking = () => {
      if (a.id == d.id) {
        P(a);
      }
    };
    a.onseeked = () => {
      if (a.id == d.id) {
        P(a);
      }
    };
    a.onloadedmetadata = () => {
      a.onloadedmetadata = null;
      J(a);
    };
    a.onprogress = () => {
      a.onprogress = null;
      a.ta = setInterval(U, 500, a);
      a.zo = true;
    };
    var va = a.ze.split(",");
    var vb = true;
    for (var i = 0; i < va.length; i++) {
      va[i] = va[i].trim();
      if (va[i] != "") {
        G(a, va[i], i + 1);
        vb = false;
      }
    }
    if (vb) {
      H(a);
    }
  }
  function G(a, file_url, vc) {
    var vd = a.id + "_" + vc;
    a.innerHTML +=
      '<source id="' + vd + '" src="' + file_url + '" crossorigin="anonymous">';
  }
  function H(a) {
    a.zh = false;
    a.zm = false;
    a.zl = false;
    a.zj = true;
    D(a, "error");
    if (a.id == c.id) {
      c = false;
    }
  }
  function J(a) {
    if (a.preload == "auto") {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        a.preload = "metadata";
      }
      var vf = a.play();
      if (vf !== undefined) {
        vf.then(() => {
          if (a.autoplay) {
            M(a);
          } else {
            K(a);
          }
        }).catch((error) => {
          K(a);
        });
      }
    } else {
      if (a.readyState > 2) {
        M(a);
      } else {
        V(a);
        if (a.zf == a.zd) {
          T(a);
        }
        a.tb = setInterval(L, 250, a);
      }
    }
  }
  function K(a) {
    a.pause();
    D(a, "off");
    a.currentTime = 0;
    a.zf = 0;
    a.zk = false;
    if (a.autoplay && c) {
      if (a.id == c.id) {
        d = c;
        c = false;
      }
    }
  }
  function L(a) {
    V(a);
    var vg = 0;
    for (var i = 0; i < buffered(a).length; i++) {
      if (buffered(a).start(buffered(a).length - 1 - i) <= currentTime(a)) {
        vg = buffered(a).end(buffered(a).length - 1 - i);
        break;
      }
    }
    if (vg >= currentTime(a)) {
      clearInterval(a.tb);
      M(a);
    }
  }
  function M(a) {
    a.zh = false;
    a.zk = false;
    if (!a.zl) {
      if (!a.zm) {
        O(a);
      }
    } else {
      stop(a);
    }
  }
  function O(a) {
    if (currentTime(a) == duration(a)) {
      T(a);
    }
    V(a);
    d = false;
    a.zl = true;
    if (a.zd > 0) {
      a.tc = setInterval(Q, 50, a);
    }
    a.play();
    var vp = setTimeout(function () {
      if (a.zl && a.paused) {
        stop();
      }
      clearTimeout(vp);
    }, 25);
    D(a, "play");
  }
  function play(vo) {
    if (!vo) {
      if (d) {
        vo = d.id;
      } else {
        vo = b[0];
      }
    }
    var a = audioElements[vo];
    if (!a.zl) {
      C(a);
    }
  }
  function Q(a) {
    if (!a.zn) {
      P(a);
      if (currentTime(a) == duration(a)) {
        if (a.loop) {
          T(a);
        } else {
          stop(0);
        }
      }
    }
  }
  function P(a) {
    a.zf = Math.round((currentTime(a) * a.zd) / duration(a));
    a.za.style.left = a.zf + "px";
  }
  function stop(vm) {
    if (c) {
      clearInterval(c["tc"]);
      c.zm = true;
      c.zl = false;
      c.pause();
      D(c, "off");
      if (vm == 0) {
        T(c);
      } else {
        c.zf = c.za.offsetLeft;
      }
      if (!c.zk) {
        d = c;
      }
      c = false;
    }
  }
  function T(a) {
    if (duration(a)) {
      a.currentTime = 0;
    }
    a.zf = 0;
    a.za.style.left = 0 + "px";
  }
  function reset(vo) {
    if (!vo) {
      if (d) {
        vo = d.id;
      } else {
        vo = b[0];
      }
    }
    var a = audioElements[vo];
    T(a);
  }
  function U(a) {
    if (duration(a)) {
      var vh;
      if (a.zd == 0) {
        vh = 0;
      } else {
        vh = Math.round((a.zf / a.zd) * duration(a) * 100) / 100;
      }
      var vi = 0;
      for (var i = 0; i < buffered(a).length; i++) {
        if (buffered(a).start(buffered(a).length - 1 - i) <= vh) {
          vi = buffered(a).end(buffered(a).length - 1 - i);
          break;
        }
      }
      a.zg = Math.round((vi / duration(a)) * 100);
      a.za.parentNode.parentNode
        .querySelector("div:nth-child(2)")
        .querySelector("div").style.width = a.zg + "%";
      if (a.zg == 100) {
        clearInterval(a.ta);
        a.zo = false;
      }
    }
  }
  function V(a) {
    if (a.zd > 0) {
      a.currentTime = (a.zf / a.zd) * duration(a);
    }
  }
  function onResize() {
    var vj = document.querySelectorAll("div.essential_audio");
    vj.forEach((vo) => {
      var vk = vo.getAttribute("id");
      var a = audioElements[vk];
      if (a.zo) {
        clearInterval(a.ta);
      }
      a.zb = a.za.offsetWidth;
      var vl = vo.querySelector("div:nth-child(1)").offsetWidth - a.zb;
      if (vl < 0) {
        vl = 0;
      }
      if (a.za.offsetLeft > 0 && vk != c.id) {
        a.zf = Math.round((a.za.offsetLeft / a.zd) * vl);
        a.za.style.left = a.zf + "px";
      }
      a.zd = vl;
      if (duration(a) && !a.zl) {
        V(a);
      }
      if (a.zo) {
        a.ta = setInterval(U, 500, a);
      }
    });
  }
  window.addEventListener("resize", onResize);
  return {
    init: init,
    Audio: audioElements,
    Play: play,
    Stop: stop,
    Reset: reset,
    players: players,
    active: active,
    last: last,
  };
  function players() {
    return b;
  }
  function active() {
    if (c) {
      return c.id;
    } else {
      return false;
    }
  }
  function last() {
    if (d) {
      return d.id;
    } else {
      return false;
    }
  }
  function init() {
    d = false;
    c = false;
    audioElements = {};
    setupPlayers();
  }
})();
