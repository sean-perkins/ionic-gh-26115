import { LitElement, html, HTMLTemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { IonicStyles } from "../styles/ionic-styles.js";

@customElement("app-root")
export class AppRoot extends LitElement {

	static styles = [ IonicStyles ];

	render(): HTMLTemplateResult
	{

		return html`

			<div class="ion-padding ion-margin default-box" style="background-color: #808080">

				<h3>Hello from  App Root!</h3>

				<ion-app>

					<ion-router>

						<ion-route url="/" component="home-view"></ion-route>
						<ion-route url="/about" component="about-view"></ion-route>

					</ion-router>

					<ion-router-outlet></ion-router-outlet>

				</ion-app>
			
			<div>

		`;

	}

}