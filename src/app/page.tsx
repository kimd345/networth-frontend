'use client'

import Router from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function Home() {  // PlaidLink
	const [token, setToken] = useState(null);

	useEffect(() => {
		const createLinkToken = async () => {
			const response = await fetch('/api/create-link-token', {
				method: 'POST',
			});
			const { link_token } = await response.json();
			setToken(link_token);
		};
		createLinkToken();
	}, []);

  // @ts-expect-error publicToken is implicitly any
	const onSuccess = useCallback(async (publicToken) => {
		await fetch('/api/exchange-public-token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ public_token: publicToken }),
		});
		Router.push('/dash');
	}, []);

	const { open, ready } = usePlaidLink({
		token,
		onSuccess,
	});

	return (
		<button onClick={() => open()} disabled={!ready}>
			<strong>Link account</strong>
		</button>
	);
}
