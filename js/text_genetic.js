function genetic(all_elem) {

    function loss(s1, s2) {
        let sum = 0;
        for (let i = 0, l = Math.min(s1.length, s2.length); i < l; i++) {
            sum += Math.abs(s1.charCodeAt(i) - s2.charCodeAt(i));
        }
        return sum
    }

    function rsoftmax(s) {
        let sum = 0;
        for (let i = 0, l = s.length; i < l; i++) {
            s[i] = Math.exp(1 / s[i]);
            sum += s[i];
        }

        for (let i = 0, l = s.length; i < l; i++) {
            s[i] = s[i] / sum;
            if (s[i] === NaN) {
                s[i] = 1;
            }
        }
        return s;
    }

    function variation(c) {
        return String.fromCharCode(Math.round(Math.random() * 60 + c.charCodeAt() - 30));
    }

    // DNA 变异
    function variations(s) {
        let arr = Array.from(s);
        let n = Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
            let k = Math.floor(arr.length * Math.random());
            arr[k] = variation(arr[k]);
        }
        return arr.join("");
    }

    // DNA 融合
    function cross(s1, s2) {
        let m = Math.round(Math.random() * Math.min(s1.length, s2.length));
        return Math.random() < 0.5 ? (s1.slice(0, m) + s2.slice(m)) : (s2.slice(0, m) + s1.slice(m));
    }

    function random_choice(s) {
        return s[Math.floor(s.length * Math.random())];
    }

    const MAXP = 30;

    for (let p of all_elem) {
        let cnt = 0;
        let ans = p.innerText;
        if (typeof ans !== 'string') continue;
        let single = '';
        for (let i = 0, l = ans.length; i < l; i++) {
            single += " ";
        }
        p.innerText = single;


        let generation = [];
        while (generation.length < MAXP) {
            generation.push({
                DNA: variations(single)
            });
        }

        let best_single = {
            DNA: single,
            loss: Infinity,
            power: 0
        };

        for (let x = 0; x < 30; x++) {
            let update = setInterval(function () {
                cnt++;
                let losss = [];
                for (let s of generation) {
                    s.loss = loss(s.DNA, ans);
                    losss.push(s.loss);
                }
                let powers = rsoftmax(losss);
                for (let i = 0, l = powers.length; i < l; i++) {
                    generation[i].power = powers[i];
                }
                generation.sort(function (a, b) {
                    return b.loss - a.loss;
                });

                let new_generation = [];

                let best = generation.pop();
                if (best === undefined) {
                    clearInterval(update);
                    return;
                }

                if (best.loss - best_single.loss < 0) {
                    best_single = best;
                }

                if (best_single.loss === 0) {
                    clearInterval(update);
                    return;
                }

                new_generation.push({
                    DNA: best_single.DNA
                });

                while (generation.length !== 0) {
                    let s = generation.pop();
                    for (let i = 0, l = Math.round(s.power * MAXP); i < l; i++) {
                        let new_DNA = variations(cross(s.DNA, random_choice(new_generation).DNA));
                        new_generation.push({
                            DNA: new_DNA
                        });
                    }
                }

                generation = new_generation;
            }, 1000 / 600000);
        }

        let refresh = setInterval(function () {
            p.innerText = best_single.DNA + " #" + cnt;

            if (best_single.loss === 0) {
                clearInterval(refresh);
            }
        }, 1000 / 60);

    }
}