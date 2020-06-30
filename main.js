`use strict`;

// invoices.json

const invoices =
    [
        {
            "customer": "MDT",
            "performance": [
                {
                    "playId": "Гамлет",
                    "audience": 55,
                    "type": "tragedy"
                },
                {
                    "playId": "Ромео и Джульетта",
                    "audience": 35,
                    "type": "tragedy"
                },
                {
                    "playId": "Отелло",
                    "audience": 40,
                    "type": "comedy"
                }
            ]
        }
    ];


function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n <br>`;
    const format = new Intl.NumberFormat("ru-RU",
        {
            style: "currency", currency: "RUB",
            minimumFractionDigits: 2
        }).format;

    for (let perf of invoice.performance) {
        // const play = plays[perf.playlD];
        const thisAmount = perfAmount(perf);

        // Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);
        // Дополнительный бонус за каждые 10 зрителей
        if ("comedy" === perf.type) volumeCredits += Math.floor(perf.audience / 5);
        // Вывод строки счета
        result += `- ${perf.playId}: ${format(thisAmount)}`;
        result += ` (${perf.audience} мест)\n <br>`;
        totalAmount += thisAmount;


    }
    result += `Итого с вас ${format(totalAmount)}\n <br>`;

    result += `Вы заработали ${volumeCredits} бонусов\n <br>`;
    // console.log(result);
    return result;
}

function perfAmount(perf) {
    let thisAmount = 0;
    switch (perf.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`неизвестный тип: ${play.type}`);
    }

    return thisAmount;
}



const result = statement(invoices[0]);

document.getElementById('result').innerHTML = result;
