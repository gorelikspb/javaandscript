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



    // стоимость постановки
    for (let perf of invoice.performance) {
        result += `- ${perf.playId}: ${format(perfAmount(perf))}`;
        result += ` (${perf.audience} мест)\n <br>`;
    }

    // Вывод строки счета
    for (let perf of invoice.performance) {
        totalAmount += perfAmount(perf);
    }
    // бонусы за постановку        
    for (let perf of invoice.performance) {
        volumeCredits += perfCredits(perf);

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

function perfCredits(perf) {
    let thisCredits = 0;
    // Добавление бонусов
    thisCredits += Math.max(perf.audience - 30, 0);
    // Дополнительный бонус за каждые 10 зрителей
    if ("comedy" === perf.type) thisCredits += Math.floor(perf.audience / 5);

    return thisCredits;
}

const result = statement(invoices[0]);

document.getElementById('result').innerHTML = result;
