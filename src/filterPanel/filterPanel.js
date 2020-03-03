class FilterPanel {
    constructor() {
        const sideBar = document.querySelectorAll('.dashboard__sidebar')[0];
        const filterBtn = document.querySelectorAll('.dashboard__toolbar-filter .comd-button___studio')[0];
        const filterBtnChevron = filterBtn.querySelectorAll('.toolbar__icon--filter--chevron ')[0];
        const filterCloseBtn = document.querySelectorAll('.filter__header .comd-button___studio')[0];

        if (localStorage && localStorage['filter-panel-state'] === 'show') {
            showSideBar();
        }

        sideBar.addEventListener("animationend", chartResize);
        addFunctionalButtonsToFilterList();
        hideEmptyFilters();

        function chartResize() {
            // window.dispatchEvent(new Event('resize'));
            let event;

            if(typeof(Event) === 'function') {
                event = new Event('resize');
            }else{
                event = document.createEvent('Event');
                event.initEvent('resize', true, true);
            }

            window.dispatchEvent(event);
        }

        filterBtn.onclick = function() {
            if (filterBtn.classList.contains('toolbar__icon--filter--open')) {
                hideSideBar();
            }
            else {
                showSideBar();
            }
        };

        filterCloseBtn.onclick = function()  {
            hideSideBar();
        };

        function hideSideBar() {
            sideBar.classList.add('dashboard__sidebar--hide');
            sideBar.addEventListener("animationend", handlerHide);
            filterBtn.classList.remove('toolbar__icon--filter--open');
            filterBtn.classList.add('toolbar__icon--filter--closed');
            filterBtnChevron.style['display'] = 'none';

            if(localStorage) {
                localStorage['filter-panel-state'] = 'hide';
            }
        }

        function showSideBar() {
            sideBar.removeEventListener("animationend", handlerHide);
            sideBar.classList.remove('dashboard__sidebar--hide');
            sideBar.style['display'] = 'block';
            filterBtn.classList.add('toolbar__icon--filter--open');
            filterBtn.classList.remove('toolbar__icon--filter--closed');
            filterBtnChevron.style['display'] = 'block';

            if(localStorage) {
                localStorage['filter-panel-state'] = 'show';
            }
        }

        function handlerHide() {
            sideBar.style['display'] = 'none';
        }

        function addFunctionalButtonsToFilterList() {
            var filterList = document.querySelector('.filter-pane__filter-content');
            if (filterList) {
                var funcBtnsContainer = document.createElement('div');
                funcBtnsContainer.classList.add('filter-pane__func-btns');
                //funcBtnsContainer.classList.add('filter-list__item');

                var isFirefox = typeof InstallTrigger !== 'undefined';
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                var isEdge = !isIE && !!window.StyleMedia;
                if (isFirefox || isIE || isEdge) {
                    funcBtnsContainer.style.marginBottom = '120px';
                }

                var saveBtn = document.createElement('div');
                saveBtn.classList.add('btn');
                saveBtn.classList.add('btn-primary');
                saveBtn.classList.add('rpt-button');
                saveBtn.classList.add('redesigned-button');
                saveBtn.classList.add('filter-pane__save-btn');
                saveBtn.innerText = ReportTemplateConfig.translations.Apply;
                saveBtn.addEventListener('click', function() { __doPostBack(); });

                var resetBtn = document.createElement('div');
                resetBtn.classList.add('btn');
                resetBtn.classList.add('btn-primary');
                resetBtn.classList.add('rpt-button');
                resetBtn.classList.add('redesigned-button');
                resetBtn.classList.add('filter-pane__reset-btn');
                resetBtn.innerText = ReportTemplateConfig.translations.Reset;
                resetBtn.addEventListener('click', function() {
                    var filterOptions = Array.prototype.slice.call(document.querySelectorAll('.filter__selector:not(.time-period-picker) option'));
                    filterOptions.forEach(function(option) { option.selected = false; })
                    /*var timeFilterOptions = Array.prototype.slice.call(document.querySelectorAll('.filter-pane__section_type_filters .filter__selector.time-period-picker input'));
                    timeFilterOptions.forEach(function(option, index) {
                        option.checked = index === 0;
                        if (option.type === "text") {
                            option.value = "";
                        }
                    });*/
                    __doPostBack();
                });

                funcBtnsContainer.appendChild(saveBtn);
                funcBtnsContainer.appendChild(resetBtn);
                filterList.appendChild(funcBtnsContainer);
            }
        }

        function hideEmptyFilters(){
            var filterElements = Array.prototype.slice.call(document.querySelectorAll('.filter-list__item'));
            filterElements.forEach(function(el) {
                var filterOption = el.querySelector('.filter__selector');
                if(filterOption && filterOption.childElementCount === 0) {
                    el.style.display = 'none';
                }
            });
        }
    }
}

export default FilterPanel;
