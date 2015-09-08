import superagent from 'superagent';

export default function request() {
    let req = superagent.apply(superagent, arguments);

    req.pend = function () {
        return new Promise((resolve, reject) => {
            req.end((err, response) => {
                if (err) {
                    return reject(err);
                }

                return resolve(response);
            });
        });
    };

    return req;
}