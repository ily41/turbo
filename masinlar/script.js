let brandUL = document.querySelector("#brands")
let modelUL = $('#models')
let modelButton = $('#modelButton')
let brandButton = $('.brandButton')
let mainSection = $('.mainSection')
let minPrice = $('#minPrice')
let maxPrice = $('#maxPrice')
let banUL = $('#banUL')
let yearMinUL = $('#yearMinUL')
let yearMaxUL = $('#yearMaxUL')
let yearMinButton = $('#yearMinButton')
let yearMaxButton = $('#yearMaxButton')

let filtered


let ban = new Set()

carData.forEach(element => {
    element.models.forEach(type => {
        ban.add(type.bodyType)
    });
});


let filterOBJ = {
    brand: 'all',
    model: 'all',
    isNew: 'all',
    city:  new Set(),
    currency: 'all',
    ban: new Set(),
    yearMin: 'all',
    yearMax: 'all'

}

document.querySelectorAll(".btn-drop").forEach((btn) => {
    btn.addEventListener("click", () => {
        if(!$(btn).hasClass('reset')) {
            let button = btn.nextElementSibling
                document.querySelectorAll('.dropdown-content').forEach(d => {
                    if (d !== button) d.classList.add('hidden');
                  });

                button.classList.toggle("hidden")
        }
        
    })
})

/*li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>*/
carData.forEach((el) => {
    brandUL.innerHTML += `<li><a href="#" onclick = "activateModel('${el.brand}')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${el.brand}</a></li>`
})

ban.forEach(element => {
    banUL.append(`<li onclick = "banFunc(this)" class = "check pr-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex justify-between items-center "><a href="#" class="block px-4 py-2 ">${element} </a> <input type="checkbox"></li>`)
});
for(let i = 2025; i>1905;i--) {
    yearMinUL.append(`<li><a href="#" onclick = "yearMinFunc(this)" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${i}</a></li>`)}

for(let i = 2025; i>1905;i--) {
    yearMaxUL.append(`<li><a href="#" onclick = "yearMaxFunc(this)" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${i}</a></li>`)}


function activateModel(brand) {
    let carModel = carData.find(car => car.brand === brand);
    brandButton.text(`${brand}`);

        if(brand == 'reset') {
            modelButton.removeClass('bg-white');
            modelButton.addClass('bg-[#F5F6F9]');
            brandButton.text('Marka')
            modelButton.addClass('reset')
            modelButton.html('Model')
            filterOBJ.brand = 'all'
            filterOBJ.model = 'all'
            
        }else {
            filterOBJ.brand = brand
            modelButton.addClass('bg-white');
            brandButton.text(brand);
            modelButton.removeClass('reset')
            modelUL.empty()
            modelUL.append(`<li><a href="#" onclick = "modelFunc('reset')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">X Sıfırla</a></li>`)
            carModel.models.forEach(model => {
                modelUL.append(`<li><a href = "#" onclick = "modelFunc('${model.name}')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${model.name}</a></li>`)
            })
        }
    
}


function modelFunc(model) {
    if(model == 'reset') {
        modelButton.html('Model')
        filterOBJ.model = 'all'
    }else {
        modelButton.html(model)
        filterOBJ.model = model
    }
    
    
}

function isNewFunc(el) {
    
    switch(el.id) {
        case 'allButton':
            filterOBJ.isNew = 'all'
            break
        case 'newButton':
            filterOBJ.isNew = 'new'
            break
        case 'drivenButton':
            filterOBJ.isNew = 'driven'
            break

    }
    
}

function cityClick(city,cityName) {
    var checkbox = city.querySelector("input[type='checkbox']");    
    !checkbox.checked ? filterOBJ.city.add(cityName) : filterOBJ.city.delete(cityName)    
}

function currencyFunc(currency) {
    filterOBJ.currency = currency.innerText  
}

function banFunc(ban) {
    var checkbox = ban.querySelector("input[type='checkbox']");    
    !checkbox.checked ? filterOBJ.ban.add(ban.innerText) : filterOBJ.ban.delete(ban.innerText) 
}

function yearMinFunc(min) {
    filterOBJ.yearMin = min.innerText
    yearMinButton.html(`${min.innerText} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                      </svg>`)
    
}

function yearMaxFunc(max) {
    filterOBJ.yearMax = max.innerText
    yearMaxButton.html(`${max.innerText} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                      </svg>`)
    
}

document.querySelectorAll('.check').forEach(element => {
    element.addEventListener('click', function () {
        const checkbox = $(element).children().eq(1);
        checkbox.prop('checked', !checkbox.prop('checked'));
    });
});

showCars()
function reset() {
    for (let key in filterOBJ) {
        if (filterOBJ.hasOwnProperty(key)) {
            if (filterOBJ[key] instanceof Set) {
                filterOBJ[key].clear();
            } else {
                filterOBJ[key] = 'all';
            }
        }
    }
}


function showCars() {
    
    
    mainSection.empty()
    let curBrand
    filtered = structuredClone(carData)
    
    if(filterOBJ.brand != 'all') { 
        filtered = filtered.filter(element => element.brand == filterOBJ.brand)
        curBrand = carData.find(element => element.brand == filterOBJ.brand)
    }

    if(filterOBJ.model != 'all') {
        filtered[0].models = filtered[0].models.filter(element => element.name == filterOBJ.model)
    }

    
    switch(filterOBJ.isNew) {
        case 'new':
            filtered.forEach(element => {
                element.models = filtered[0].models.filter(element => element.isNew === true)
            });
            break
        case 'driven':
            filtered.forEach(element => {
                element.models = filtered[0].models.filter(element => element.isNew === false)
            });
            break
    }

    
    if(filterOBJ.city.size != 0) {
        console.log(filterOBJ.city);
        
        
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => filterOBJ.city.has(element.city))
        });
        
    }

    if(filterOBJ.ban.size != 0) {
        console.log(filterOBJ.ban);
        
        
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => filterOBJ.ban.has(element.bodyType))
        });
        
    }

    if(minPrice.val() != "") {
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => element.price > minPrice.val())
        });
    }
    if(maxPrice.val() != "") {
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => element.price < maxPrice.val())
        });
    }

    if(filterOBJ.currency != 'all') {
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => element.currency == filterOBJ.currency)
        });
    }

    if(filterOBJ.yearMin != 'all') {
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => element.year >=filterOBJ.yearMin)
        });
    }

    if(filterOBJ.yearMax != 'all') {
        filtered.forEach(element => {
            element.models = filtered[0].models.filter(element => element.year <=   filterOBJ.yearMax)
        });
    }


    
    
    
    filtered.forEach(element => {
        element.models.forEach(car => {
            mainSection.append(`<div class = "w-full flex flex-col rounded-sm bg-white">
                <div class = "flex-2">
                  <img class = "w-full rounded-lg" src="https://turbo.azstatic.com/uploads/f460x343/2024%2F11%2F19%2F21%2F15%2F01%2F3bfdce4c-f285-468c-8b7a-4d2646ee0c72%2F82570_03Jwy_e00fC2mfxpGD9upA.jpg"
                   alt="">
                </div>
    
                <div class = " flex flex-col flex-1 px-2 py-1">
                  <span class = "font-semibold text-lg">${car.price} ${car.currency}</span>
                  <span class = "text-lg">${element.brand} ${car.name}</span>
                  <span class = "text-lg">${car.year} 1.9l, 47000 km</span>
                  <span class = "text-gray-400">${car.city}, bu gun 11:07</span>
                </div>
    
              </div>`)
        })
    })
}




