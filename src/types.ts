export interface Model {
	heightValue: number;
	heightUnits: string;
	widthValue: number;
	widthUnits: string;
	color: string;
	description: string;
	invalidFeedbacks: Record<string, string>;
	apiResult: ApiPayLoad;
	result: null;
}

export interface ApiPayLoad {
	css: string;
	description: string;
}
