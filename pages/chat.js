import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/compoments/ButtonSendSticker';

const supabaseUrl = 'https://gtoenrkiiypfwiirfsvh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQzMzI5NTg3LCJleHAiOjE5NTg5MDU1ODd9.wcFA3v-JqfPxlEIzYkQXYE6LcQeV0m55pCtSYRKz53g';

const client = createClient(supabaseUrl, supabaseAnonKey);

export default function ChatPage() {

    const [mensagem, setMensagem] = useState('');
    const roteamento = useRouter();
    const [listMensagens, setListMensagens] = useState([]);
    const username = roteamento.query.username;
    const [carregado, setCarregado] = useState(0);

    function mensagensEmTempoReal(adicionaMensagem){
        return client
        .from('chat')
        .on('INSERT', (resposta) =>{
            adicionaMensagem(resposta.new);
        })
        .subscribe();
    }
    
    useEffect(() => {
        carregarDados();
        
        mensagensEmTempoReal((novaMensagem) =>{
            setListMensagens((valorAtualDaLista) =>{
                return [
                    novaMensagem,
                    ...valorAtualDaLista
                ]
            });
        });
    }, []);
   
    function carregarDados() {
        client.from('chat')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListMensagens(data);
            })
            .then(() => {
                setCarregado(1);
            })
    }

    function exibeLoading(){
        if (!carregado) {
            return(
                <Image
                styleSheet={{
                    width: '100%',
                    height: '70%',
                    display: 'inline-block',
                    marginRight: '8px',
                }}
                src={`https://forums.gameex.com/forums/uploads/monthly_2019_10/465894441_ScaredStiff(Bally1996).gif.00fdabc9ccf7ccd24a97dbb56c130df6.gif`}
            />
            )
        }
    }

    function toSend(msg) {
        const mensagem = {
            de: username,
            texto: msg
        }

        client.from('chat')
            .insert([mensagem])
            .then(({ data }) => {
                
            })

        setMensagem('');
    }

    function getKey(event) {
        if (event.key === 'Enter') {
            sendMensagem(event)
        }

    }


    function sendMensagem(event) {
        event.preventDefault();
        if (mensagem.trim() !== '') {
            toSend(mensagem);
        }
    }

    function handleTextField(event) {
        setMensagem(event.target.value);
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >                    
                     {exibeLoading()}

                    <MessageList mensagens={listMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={handleTextField}
                            onKeyPress={getKey}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker onStickerClick={(sticker) =>{
                            toSend(':sticker: ' + sticker )
                        }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
<<<<<<< HEAD
                overflow: 'hidden',
                overflow: 'auto',
                overflowX: 'hidden',
=======
                overflow: 'auto',
>>>>>>> c3d06dc7eb7a6d92cdfab1d5c0cfaaaca3b0131c
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {
                props.mensagens.map((mensagem) => {
                    return (
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                        hover: {
                                            width: '240px',
                                            height: '240px',
                                        }
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                />

                                    


                                <Text tag="strong" 
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                >
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            {mensagem.texto.startsWith(':sticker:') ? (
                                <Image styleSheet={{width: '100px'}} src={mensagem.texto.replace(':sticker:', '')} />
                            ) : (
                                mensagem.texto
                            )}
                        </Text>
                    );
                })
            }

        </Box>
    )
}