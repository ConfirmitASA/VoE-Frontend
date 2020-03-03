import Gauge from './gauge';

class KPIgauges {
    constructor() {
        if (ReportTemplateConfig.gaugeData) {
            ReportTemplateConfig.gaugeData.forEach(function (currentGaugeData) {
                var value = currentGaugeData.score;
                var container = document.getElementById("gauge-container-" + currentGaugeData.qid);
                container.classList.add("gauge");
                let gauge = new Gauge({
                    container: container,
                    colors: ReportTemplateConfig.gaugeThreshold,
                    greyColor: ReportTemplateConfig.Styling.greyColor,
                    type: ReportTemplateConfig.gaugeType,
                    value: currentGaugeData.score
                });
            });
        }
    }
}

export default KPIgauges;