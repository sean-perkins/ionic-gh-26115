import { LitElement, html, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import { IonicStyles } from "../styles/ionic-styles.js";

@customElement("app-root")
export class AppRoot extends LitElement {

	static styles = [IonicStyles];

	render(): HTMLTemplateResult {
		return html`
				<ion-app>
					<ion-router root="src" use-hash="false">
						<ion-route url="/" component="home-view"></ion-route>
						<ion-route url="/about" component="about-view"></ion-route>
					</ion-router>

					<ion-router-outlet></ion-router-outlet>

				</ion-app>
		`;
	}

	protected createRenderRoot() {
		return this;
	}

}