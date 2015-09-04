import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
} = process.env;

export default function requestPostLootCard(userId, cardId) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/matches/loot/${userId}`)
        .send({ cardId })
        .pend()
        .then(response => JSON.parse(response.text));
}