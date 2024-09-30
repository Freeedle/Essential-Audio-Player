// Essential Audio Player v2.1
"use strict";
var Essential_Audio = (() => {
  var audioElements = {};
  var b = [];
  var currentAudio = false;
  var lastAudio = false;
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
      var audio = audioElements[ic];
      audio.id = ic;
      audio.za = vo.querySelector("div:nth-child(1)").querySelector("div");
      audio.zb = audio.za.offsetWidth;
      audio.zc = vo.querySelector("div:nth-child(3)");
      audio.zd = vo.querySelector("div:nth-child(1)").offsetWidth - audio.zb;
      if (audio.zd < 0) {
        audio.zd = 0;
      }
      audio.ze = vo.getAttribute("data-url");
      audio.zf = 0;
      audio.zg = 0;
      audio.zh = false;
      audio.zis = 0;
      audio.zj = false;
      audio.zk = false;
      audio.zl = false;
      audio.zm = false;
      audio.zn = false;
      audio.zo = false;
      b[ib] = ic;
      audio.crossOrigin = "anonymous";
      audio.preload = "metadata";
      if (vo.hasAttribute("data-loop")) {
        audio.loop = true;
      }
      if (vo.hasAttribute("data-scratch")) {
        audio.zp = true;
      } else {
        audio.zp = false;
      }
      if (vo.hasAttribute("data-passive")) {
        audio.zq = true;
      } else {
        audio.zq = false;
      }
      if (vo.hasAttribute("data-autoplay")) {
        if (!autoplayInit) {
          autoplayInit = true;
          audio.autoplay = true;
          audio.preload = "auto";
          currentAudio = audio;
          E(audio);
        }
      }
      if (vo.hasAttribute("data-preload")) {
        if (!audio.autoplay) {
          audio.preload = "auto";
          E(audio);
        }
      }
      audio.za.onmousedown = (e) => {
        if (!k) {
          po(e);
          window.addEventListener("mousemove", (e) => {
            po(e);
          });
          Ba(audio);
        }
      };
      if (!audio.zq) {
        audio.za.ontouchstart = (e) => {
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(l);
          k = true;
          po(e);
          window.addEventListener("touchmove", (e) => {
            po(e);
          });
          Ba(audio);
        };
      } else {
        audio.za.addEventListener(
          "touchstart",
          (e) => {
            e.stopPropagation();
            clearTimeout(l);
            k = true;
            po(e);
            window.addEventListener("touchmove", (e) => {
              po(e);
            });
            Ba(audio);
          },
          ie ? { passive: true } : false
        );
      }
      audio.zc.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!k) {
          po(e);
          window.addEventListener("mousemove", (e) => {
            po(e);
          });
          Bb(audio);
        }
      };
      if (!audio.zq) {
        audio.zc.ontouchstart = (e) => {
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(l);
          k = true;
          po(e);
          window.addEventListener("touchmove", (e) => {
            po(e);
          });
          Bb(audio);
        };
      } else {
        audio.zc.addEventListener(
          "touchstart",
          (e) => {
            e.stopPropagation();
            clearTimeout(l);
            k = true;
            po(e);
            window.addEventListener("touchmove", (e) => {
              po(e);
            });
            Bb(audio);
          },
          ie ? { passive: true } : false
        );
      }
    });
  }
  function Ba(audio) {
    audio.zn = true;
    h = j;
    i = h - (audio.za.getBoundingClientRect().left + window.scrollX);
    if (!k) {
      window.addEventListener("mousemove", Bc);
    } else {
      audio.te = setTimeout(function () {
        window.addEventListener("touchmove", Bc);
        clearTimeout(audio.te);
      }, 100);
    }
    function Bc() {
      if (h != j) {
        m = true;
        if (audio.zd > 0) {
          audio.za.classList.add("drag");
        }
      }
      if (m && audio.zd > 0) {
        o =
          j -
          (audio.za.parentNode.getBoundingClientRect().left + window.scrollX) -
          i;
        audio.zf = Math.min(Math.max(o, 0), audio.zd);
        audio.za.style.left = audio.zf + "px";
        if (audio.zp && audio.zl) {
          V(audio);
          if (audio.paused && currentTime(audio) != duration(audio)) {
            audio.play();
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
      clearTimeout(audio.te);
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
        if (duration(audio) && audio.zd > 0) {
          if (!audio.zp || !audio.zl) {
            V(audio);
          }
          if (
            audio.zl &&
            audio.paused &&
            currentTime(audio) != duration(audio)
          ) {
            audio.play();
          }
        }
        m = false;
        audio.za.classList.remove("drag");
      } else {
        if (currentAudio.id && currentAudio.id == audio.id && audio.zl) {
          P(audio);
        }
        if (!audio.zj) {
          C(audio);
        }
      }
      audio.zn = false;
      if (k) {
        l = setTimeout(function () {
          k = false;
          clearTimeout(l);
        }, 150);
      }
    }
  }
  function Bb(audio) {
    if (audio.zd > 0) {
      audio.zn = true;
      h = j;
      i = Math.floor(audio.zb / 2);
      if (!k) {
        window.addEventListener("mousemove", Bf);
      } else {
        audio.te = setTimeout(function () {
          window.addEventListener("touchmove", Bf);
          clearTimeout(audio.te);
        }, 100);
      }
      function Bf() {
        m = true;
        audio.za.classList.add("drag");
        o = j - audio.za.parentNode.getBoundingClientRect().left - i;
        audio.zf = Math.min(Math.max(o, 0), audio.zd);
        audio.za.style.left = audio.zf + "px";
        if (audio.zp && audio.zl) {
          V(audio);
          if (audio.paused && currentTime(audio) != duration(audio)) {
            audio.play();
          }
        }
      }
      if (!k) {
        window.addEventListener("mouseup", Bg);
      } else {
        window.addEventListener("touchend", Bg);
      }
      function Bg() {
        clearTimeout(audio.te);
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
          if (duration(audio)) {
            if (!audio.zp || audio.zl) {
              V(audio);
            }
            if (
              audio.zl &&
              audio.paused &&
              currentTime(audio) != duration(audio)
            ) {
              audio.play();
            }
          }
          m = false;
          audio.za.classList.remove("drag");
        } else {
          p = j - audio.za.parentNode.getBoundingClientRect().left - i;
          audio.zf = Math.min(Math.max(p, 0), audio.zd);
          audio.za.style.left = audio.zf + "px";
          if (duration(audio)) {
            V(audio);
            if (audio.zl) {
              audio.play();
            }
          }
        }
        audio.zn = false;
        if (k) {
          l = setTimeout(function () {
            k = false;
            clearTimeout(l);
          }, 150);
        }
      }
    }
  }
  function C(audio) {
    if (currentAudio) {
      stop();
      if (audio.id == currentAudio.id) {
        return;
      }
    }
    currentAudio = audio;
    if (duration(audio)) {
      O(audio);
    } else {
      if (!audio.zh) {
        E(audio);
      }
    }
  }
  function D(audio, vn) {
    audio.za.setAttribute("class", "");
    audio.za.classList.add(vn);
  }
  function E(audio) {
    D(audio, "load");
    audio.zh = true;
    audio.zk = true;
    audio.onplay = () => {
      if (!audio.zk) {
        clearTimeout(audio.td);
        D(audio, "play");
      }
      if (audio.id == lastAudio.id) {
        currentAudio = audio;
        lastAudio = false;
        audio.zl = true;
        if (audio.zd > 0) {
          audio.tc = setInterval(Q, 50, audio);
        }
      }
    };
    audio.onplaying = () => {
      clearTimeout(audio.td);
      D(audio, "play");
    };
    audio.onwaiting = () => {
      audio.td = setTimeout(() => {
        D(audio, "load");
      }, 50);
    };
    audio.onpause = () => {
      if (!audio.zk && !audio.zn && !audio.ended) {
        D(audio, "off");
      }
      if (audio.zl && !audio.zk && !audio.ended) {
        stop();
      }
    };
    audio.onended = () => {
      if (audio.zd == 0 && !audio.loop) {
        stop(0);
      }
    };
    audio.onseeking = () => {
      if (audio.id == lastAudio.id) {
        P(audio);
      }
    };
    audio.onseeked = () => {
      if (audio.id == lastAudio.id) {
        P(audio);
      }
    };
    audio.onloadedmetadata = () => {
      audio.onloadedmetadata = null;
      J(audio);
    };
    audio.onprogress = () => {
      audio.onprogress = null;
      audio.playAnimationInterval = setInterval(updatePlayProgress, 500, audio);
      audio.zo = true;
    };
    var va = audio.ze.split(",");
    var vb = true;
    for (var i = 0; i < va.length; i++) {
      va[i] = va[i].trim();
      if (va[i] != "") {
        G(audio, va[i], i + 1);
        vb = false;
      }
    }
    if (vb) {
      H(audio);
    }
  }
  function G(audio, file_url, vc) {
    var vd = audio.id + "_" + vc;
    audio.innerHTML +=
      '<source id="' + vd + '" src="' + file_url + '" crossorigin="anonymous">';
  }
  function H(audio) {
    audio.zh = false;
    audio.zm = false;
    audio.zl = false;
    audio.zj = true;
    D(audio, "error");
    if (audio.id == currentAudio.id) {
      currentAudio = false;
    }
  }
  function J(audio) {
    if (audio.preload == "auto") {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        audio.preload = "metadata";
      }
      var vf = audio.play();
      if (vf !== undefined) {
        vf.then(() => {
          if (audio.autoplay) {
            M(audio);
          } else {
            K(audio);
          }
        }).catch((error) => {
          K(audio);
        });
      }
    } else {
      if (audio.readyState > 2) {
        M(audio);
      } else {
        V(audio);
        if (audio.zf == audio.zd) {
          T(audio);
        }
        audio.tb = setInterval(L, 250, audio);
      }
    }
  }
  function K(audio) {
    audio.pause();
    D(audio, "off");
    audio.currentTime = 0;
    audio.zf = 0;
    audio.zk = false;
    if (audio.autoplay && currentAudio) {
      if (audio.id == currentAudio.id) {
        lastAudio = currentAudio;
        currentAudio = false;
      }
    }
  }
  function L(audio) {
    V(audio);
    var vg = 0;
    for (var i = 0; i < buffered(audio).length; i++) {
      if (
        buffered(audio).start(buffered(audio).length - 1 - i) <=
        currentTime(audio)
      ) {
        vg = buffered(audio).end(buffered(audio).length - 1 - i);
        break;
      }
    }
    if (vg >= currentTime(audio)) {
      clearInterval(audio.tb);
      M(audio);
    }
  }
  function M(audio) {
    audio.zh = false;
    audio.zk = false;
    if (!audio.zl) {
      if (!audio.zm) {
        O(audio);
      }
    } else {
      stop(audio);
    }
  }
  function O(audio) {
    if (currentTime(audio) == duration(audio)) {
      T(audio);
    }
    V(audio);
    lastAudio = false;
    audio.zl = true;
    if (audio.zd > 0) {
      audio.tc = setInterval(Q, 50, audio);
    }
    audio.play();
    var vp = setTimeout(function () {
      if (audio.zl && audio.paused) {
        stop();
      }
      clearTimeout(vp);
    }, 25);
    D(audio, "play");
  }
  function play(vo) {
    if (!vo) {
      if (lastAudio) {
        vo = lastAudio.id;
      } else {
        vo = b[0];
      }
    }
    var audio = audioElements[vo];
    if (!audio.zl) {
      C(audio);
    }
  }
  function Q(audio) {
    if (!audio.zn) {
      P(audio);
      if (currentTime(audio) == duration(audio)) {
        if (audio.loop) {
          T(audio);
        } else {
          stop(0);
        }
      }
    }
  }
  function P(audio) {
    audio.zf = Math.round((currentTime(audio) * audio.zd) / duration(audio));
    audio.za.style.left = audio.zf + "px";
  }
  function stop(vm) {
    if (currentAudio) {
      clearInterval(currentAudio["tc"]);
      currentAudio.zm = true;
      currentAudio.zl = false;
      currentAudio.pause();
      D(currentAudio, "off");
      if (vm == 0) {
        T(currentAudio);
      } else {
        currentAudio.zf = currentAudio.za.offsetLeft;
      }
      if (!currentAudio.zk) {
        lastAudio = currentAudio;
      }
      currentAudio = false;
    }
  }
  function T(audio) {
    if (duration(audio)) {
      audio.currentTime = 0;
    }
    audio.zf = 0;
    audio.za.style.left = 0 + "px";
  }
  function reset(vo) {
    if (!vo) {
      if (lastAudio) {
        vo = lastAudio.id;
      } else {
        vo = b[0];
      }
    }
    T(audioElements[vo]);
  }
  function updatePlayProgress(audio) {
    if (duration(audio)) {
      var vh;
      if (audio.zd == 0) {
        vh = 0;
      } else {
        vh = Math.round((audio.zf / audio.zd) * duration(audio) * 100) / 100;
      }
      var vi = 0;
      for (var i = 0; i < buffered(audio).length; i++) {
        if (buffered(audio).start(buffered(audio).length - 1 - i) <= vh) {
          vi = buffered(audio).end(buffered(audio).length - 1 - i);
          break;
        }
      }
      audio.zg = Math.round((vi / duration(audio)) * 100);
      audio.za.parentNode.parentNode
        .querySelector("div:nth-child(2)")
        .querySelector("div").style.width = audio.zg + "%";
      if (audio.zg == 100) {
        clearInterval(audio.playAnimationInterval);
        audio.zo = false;
      }
    }
  }
  function V(audio) {
    if (audio.zd > 0) {
      audio.currentTime = (audio.zf / audio.zd) * duration(audio);
    }
  }
  function onResize() {
    var vj = document.querySelectorAll("div.essential_audio");
    vj.forEach((vo) => {
      var vk = vo.getAttribute("id");
      var audio = audioElements[vk];
      if (audio.zo) {
        clearInterval(audio.playAnimationInterval);
      }
      audio.zb = audio.za.offsetWidth;
      var vl = vo.querySelector("div:nth-child(1)").offsetWidth - audio.zb;
      if (vl < 0) {
        vl = 0;
      }
      if (audio.za.offsetLeft > 0 && vk != currentAudio.id) {
        audio.zf = Math.round((audio.za.offsetLeft / audio.zd) * vl);
        audio.za.style.left = audio.zf + "px";
      }
      audio.zd = vl;
      if (duration(audio) && !audio.zl) {
        V(audio);
      }
      if (audio.zo) {
        audio.playAnimationInterval = setInterval(
          updatePlayProgress,
          500,
          audio
        );
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
    if (currentAudio) {
      return currentAudio.id;
    } else {
      return false;
    }
  }
  function last() {
    if (lastAudio) {
      return lastAudio.id;
    } else {
      return false;
    }
  }
  function init() {
    lastAudio = false;
    currentAudio = false;
    audioElements = {};
    setupPlayers();
  }
})();
