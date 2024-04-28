<section class="whoami">
	<pre>
          ██╗    ██╗██╗  ██╗ ██████╗  █████╗ ███╗   ███╗██╗          
          ██║    ██║██║  ██║██╔═══██╗██╔══██╗████╗ ████║██║          
█████╗    ██║ █╗ ██║███████║██║   ██║███████║██╔████╔██║██║    █████╗
╚════╝    ██║███╗██║██╔══██║██║   ██║██╔══██║██║╚██╔╝██║██║    ╚════╝
          ╚███╔███╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║          
           ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝          

    
  </pre>
	<div class="whoami__details">
		<div class="whoami__person">
			<p class="whoami__subtitle">Person</p>
			<p><strong>Name:</strong> Veegish Ramdani</p>
			<p><strong>Occupation:</strong> Software Engineer</p>
			<p>
				<strong>Interests:</strong> Street Photography, Hiking, Gaming
			</p>
		</div>
		<div class="whoami__tools">
			<p class="whoami__subtitle">Dev Tools & Tech Stack</p>
			<p><strong>OS:</strong> Arch Linux, Linux Mint</p>
			<p><strong>Software Development:</strong> VSCode, ZSH Shell</p>
			<p><strong>Prototyping:</strong> Figma</p>
			<p><strong>Stack:</strong> Typescript, React + NextJS, Electron, Svelte + SvelteKit</p>
		</div>
		<div class="whoami__hardware">
			<p class="whoami__subtitle">Hardware</p>
			<p><u>PC</u></p>
			<p><strong>CPU:</strong> Ryzen 9 3900x 12 Cores 24 Threads</p>
			<p><strong>GPU:</strong> ZOTAC RTX2060</p>
			<p><strong>Motherboard:</strong> ASUS ROG Strix B550-A</p>
			<p><strong>Cooler:</strong> Cooler Master Hyper 212 RGB Black Edition</p>
			<p><strong>RAM:</strong> Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4 3200MHz C16</p>
			<p><strong>Storage:</strong></p>
			<ul>
				<li>Samsung 970 EVO SSD 1TB NVMe</li>
				<li>SAMSUNG 970 EVO Plus SSD 500GB NVMe</li>
				<li>WD_BLACK 5TB P10 Game Drive</li>
			</ul>
			<p><strong>Case:</strong> Cooler Master TD500 Mesh</p>
		</div>
	</div>
</section>

<style>
	.whoami {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 10px;
	}

	.whoami > pre {
		font-size: 6px;
	}

	.whoami__details {
		text-align: left;
		display: grid;
		grid-column-gap: 10px;
		grid-row-gap: 20px;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, 0.5fr);
		justify-content: center;
	}
	.whoami__hardware > ul > li {
		list-style-type: circle;
		margin-left: 50px;
	}

	.whoami__subtitle::before {
		color: var(--red-9);
		content: '[';
		font-weight: bold;
		margin-right: 10px;
	}
	.whoami__subtitle::after {
		color: var(--red-9);
		content: ']';
		font-weight: bold;
		margin-left: 10px;
	}

	@media (min-width: 768px) {
		.whoami > pre {
			font-size: 10px;
		}
		.whoami__details {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, 0.5fr);
		}
	}
</style>
