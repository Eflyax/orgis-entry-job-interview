export interface Model {
	heightValue: number;
	heightUnits: string;
	widthValue: number;
	widthUnits: string;
	color: string;
	description: string;
	invalidFeedbacks: Record<string, string>;
}
export interface ModelResponse extends Model {
	id: number;
}
