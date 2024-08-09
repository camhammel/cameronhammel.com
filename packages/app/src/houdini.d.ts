declare namespace App {
	// user-specific information passed to each query
	interface Session {
		user?: {
			token: string;
		};
	}

	// used to thread information between plugins
	interface Stuff {}

	// used to pass one-off configuration for a request
	interface Metadata {
		doTheThing?: boolean | null;
	}
}
