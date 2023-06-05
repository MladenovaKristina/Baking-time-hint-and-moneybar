import ConfigurableParams from "../../../data/configurable_params";

import { Tween, Sprite, DisplayObject, Ease } from '../../../utils/black-engine.module';

export default class Hint extends DisplayObject {
    constructor() {
        super();

        this.animate = false;
        this.visible = false;


    }

    onAdded() {
        this._sign = new Sprite('infinity_sign');
        this._sign.alignAnchor(0.5, 0.5);
        this._sign.y = 0;
        this._sign.scaleX = 0.35;
        this._sign.scaleY = 0.35;
        this._sign.color = 0xffffff;
        this.add(this._sign);

        const hintType = ConfigurableParams.getData()['hint']['starting_hint_type']['value'];

        const spriteName = `hint_${hintType}`.toLowerCase();
        this._hint = new Sprite(spriteName);
        this._hint.scaleX = 0.3;
        this._hint.scaleY = 0.3;
        this._hint.alignAnchor(0.4, 0);
        this._hint.rotation = 0;
        this.add(this._hint);
    }

    show() {

        this.visible = true;
        this.animateHand();


    }

    animateHand() {
        let angle = 0;
        const radius = 120;
        const speed = 0.05;
        const rotationAmplitude = 0.5;

        function animate() {
            const x = Math.cos(angle) * radius;
            const y = Math.sin(2 * angle) * radius / 2;

            //this handles the hand movement along hint
            this._hint.x = x;
            this._hint.y = y;

            //this calculates slight hand angle rotation
            const rotationAngle = Math.sin(angle) * rotationAmplitude;
            this._hint.rotation = rotationAngle;

            angle += speed;
            requestAnimationFrame(animate.bind(this));
        }

        // Start the animation
        animate.call(this);

    }

    hide() {
        const hideTween = new Tween({
            y: Black.stage.bounds.top - 160
        }, 0.3);

        this.add(hideTween);

        hideTween.on('complete', msg => this.visible = false);
    }
}

