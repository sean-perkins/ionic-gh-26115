import { LitElement, html, HTMLTemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { IonicStyles } from "../styles/ionic-styles.js";

@customElement("home-view")
export class HomeView extends LitElement {

	static styles = [ IonicStyles ];

	render(): HTMLTemplateResult
	{

		return html`

			<div class="ion-padding ion-margin default-box" style="background-color: #A9A9A9">

				<h6>Welcome to the home view!</h6>
			
			</div>

		`;

	}

}