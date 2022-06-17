'use strict'

window.addEventListener('load', function(){
    var firstNumber = 0;
    var secondNumber = 100;
    
    var lastList;
    var table = document.querySelector('table');

    // Dom
    var trs = document.querySelectorAll('tr');

    var btnNext = document.querySelector('#next');
    var btnBack = document.querySelector('#back');

    var loading = this.document.querySelector('.loading')

    var createElement = function(element){
        var tr = document.createElement("tr");
        var thPrice = document.createElement("td");
        var thName = document.createElement("td");
        var th24 = document.createElement("td");
        var th1 = document.createElement("td");
        var th7 = document.createElement("td");
    
        thName.innerHTML = `${String(element.rank)}: ${element.name}`;
        thPrice.innerHTML = element.price_usd;
        th24.innerHTML = element.percent_change_24h;
        th1.innerHTML = element.percent_change_1h;
        th7.innerHTML = element.percent_change_7d;

        if(Number(element.percent_change_24h) < 0){
            th24.style.color = "red";
        }else{
            th24.style.color = "green";
        }

        thPrice.style.color = "#2B78E6";

        if(Number(element.percent_change_1h) < 0){
            th1.style.color = "red";
        }else{
            th1.style.color = "green";
        }

        if(Number(element.percent_change_7d) < 0){
            th7.style.color = "red";
        }else{
            th7.style.color = "green";
        }

        tr.appendChild(thName);
        tr.appendChild(thPrice);
        tr.appendChild(th24);
        tr.appendChild(th1);
        tr.appendChild(th7);

        table.appendChild(tr);
    };

    var removeAllElement = function(){
        for(var i = 2; i < trs.length; i++){
            document.querySelectorAll("tr").forEach(function(element, i){
                if(i > 2)
                    element.remove();
            });
        }

        setElements(`https://api.coinlore.net/api/tickers/?start=${firstNumber}&limit=${secondNumber}`);
    }

    var setElements = function(api){
        loading.style.display = "inline-block";

        fetch(api)
        .then(data => data.json())
        .then(data => {
            var items = data.data;
            lastList = items.length;
            items.forEach(element => {
                createElement(element);
            });

            document.querySelectorAll("tr").forEach(function(element, i){
                if(i > 2)
                    element.className = "tr";
            });

            loading.style.display = "none";
        })
       .catch(err => function(){
            alert("Error al cargar");
            loading.style.display = "none";
       });
    }

    btnNext.addEventListener('click', function(){
        if(lastList >= 100){
            firstNumber = firstNumber + 100;
            secondNumber = secondNumber + 100;
        }else{
            firstNumber = 0;
            secondNumber = 0;
        }
       
        removeAllElement();
    });

    btnBack.addEventListener('click', function(){
        if(firstNumber > 0 && secondNumber > 0){
            firstNumber = firstNumber - 100;
            secondNumber = secondNumber - 100;
        }else{
            firstNumber = 9900;
            secondNumber = 9908;
        }
        removeAllElement();
    });

    setElements(`https://api.coinlore.net/api/tickers/?start=${firstNumber}&limit=${secondNumber}`);
});

