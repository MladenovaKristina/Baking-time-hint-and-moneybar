import ConfigurableParams from "../../../data/configurable_params";
import UTween from '../../helpers/../../utils/utween';

import { DisplayObject, TextField, GameObject, Sprite, Tween, Ease } from '../../../utils/black-engine.module';

export default class MoneyBar extends DisplayObject {
    constructor() {
        super();
        this.setBaseMoney();
    }

    onAdded() {
        this._container = new GameObject();
        this.add(this._container);


        this._counterBg = new Sprite('counter');
        this._counterBg.scale = 0.6;
        this._counterBg.alignAnchor(0, 0);
        this._container.addChild(this._counterBg);


        this._textField = new TextField(this._score, '', 0xffffff, this._counterBg.scale * 70, '', 700);

        this._textField.alignAnchor(0, 0.43);
        this._textField.x = this._counterBg.width / 2;
        this._textField.y = this._counterBg.height / 2;

        this._container.addChild(this._textField);

    }

    updateMoney() {
        this._score++;
        this._container.getChildAt(1).text = this._score.toString();
        this.scoreAnimation();
        this.scoreTextAnimation();
    }

    setBaseMoney() {
        this._score = 0;

    }

    scoreAnimation() {
        const plusOne = new TextField('+1', '', 0xffffff, this._counterBg.scale * 70, '', 700);
        plusOne.alignAnchor(0, 0.43);
        plusOne.x = this._counterBg.width / 2;
        this._container.addChild(plusOne);

        const initialY = plusOne.y;
        const targetY = initialY - 20; // Move 20 pixels upwards
        const duration = 500; // Animation duration in milliseconds
        const frameRate = 60; // Number of frames per second
        const frameDuration = 1000 / frameRate; // Duration of each frame in milliseconds

        let currentTime = 0;

        const animate = () => {
            currentTime += frameDuration;

            if (currentTime <= duration) {
                const progress = currentTime / duration;
                const newY = initialY - (progress * (initialY - targetY));
                plusOne.y = newY;
                setTimeout(animate, frameDuration);
            } else {
                this._container.removeChild(plusOne);
            }
        };

        setTimeout(animate, frameDuration);
    }
    scoreTextAnimation() {
        const duration = 500;
        const startScale = 1;
        const targetScale = 1.5;
        const startTime = Date.now();

        function animate() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            let progress = elapsed / duration;

            if (progress > 1) {
                progress = 1;
            }

            const scale = startScale + (targetScale - startScale) * progress;
            this._textField.scaleX = scale;
            this._textField.scaleY = scale;

            if (progress < 1) {
                requestAnimationFrame(animate.bind(this));
            }
        }

        animate.call(this);
    }
}

