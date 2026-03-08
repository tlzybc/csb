enum PingUnit {
    //% block="微秒"
    MicroSeconds,
    //% block="厘米"
    Centimeters,
    //% block="英寸"
    Inches
}

/**
 * Sonar and ping utilities
 */
//% color="#2c3e50" weight=24
//% blockId="sonar" block="超声波模块"
namespace sonar {
    /**
     * 发送超声波探测并获取回声时间(以微秒为单位)
     */
    //% blockId=sonar_ping block="trig引脚 %trig|echo引脚 %echo|单位 %unit"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }
}
